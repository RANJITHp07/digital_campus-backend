import { IUser } from "../domain/user";
import Encrypt from "../infrastructure/repository/bcryptRepository";
import jwtPassword from "../infrastructure/repository/jwtRepository";
import Nodemailer from "../infrastructure/repository/nodemailer";
import { UserRepository } from "../infrastructure/repository/userRepository";


export class Userusecase{
    private readonly userRepository: UserRepository
    private readonly bcrypt: Encrypt
    private readonly jwt: jwtPassword
    private readonly nodemailer:Nodemailer
    

    constructor(userRepository:UserRepository, bcrypt:Encrypt, jwt: jwtPassword,nodemailer:Nodemailer){
        this.userRepository = userRepository;
        this.bcrypt = bcrypt;
        this.jwt=jwt
        this.nodemailer=nodemailer
    }

    async createUser(firstName:string,lastName:string,username:string,email:string,password:string){
        try{
           const user=await this.userRepository.findUser(email); // checking if the user exist or not
           if(!user){
                const hashedPassword=await this.bcrypt.createHash(password);
                const newUser={firstName,lastName,email,username,password:hashedPassword}
                const createnewUser=await this.userRepository.createUser(newUser);
                return{
                        status:200,
                        success:true,
                        message:createnewUser
                    } 
                }
           else{
            return {
                status:200,
                success:false,
                message:"User Already exist"
            }
           }
        }catch(err){
            throw err
        }
    }


    async loginUser(email:string,password:string){
        try{
            const user:IUser | null=await this.userRepository.findUser(email);
            if(user){
                const match:boolean=await this.bcrypt.compare(password,user.password);
               if(match){
                if(user.id){
                    this.jwt.createJWT(user.id)
                    return {
                      status:200,
                      success:true,
                      data:user.id,
                      message:"Sucessfully logged In"
                    }
                }
                return null
                
               }else{
                return {
                    status:200,
                    success:false,
                    message:"Wrong password"
                  }
               }
            }else{
                return {
                    status:200,
                    success:false,
                    message:"Wrong email id"
                  }
            }
        }catch(err){
            throw err
        }
    }


    async getAllUsers(){
        try{ 
            const allUsers=await this.userRepository.findAll();
            return {
                status:200,
                success:true,
                data:allUsers
            }
        }catch(err){
            throw err
        }
    }


    async getUser(email:string){
        try{
             const user=await this.userRepository.findUser(email);
              return user ?
              {
                 success:true,
                 data:user
              }:
              {
                success:false,
                message:"No such user"
              }
        }catch(err){
            throw err
        }
    }

    async verifyEmail(email:string,username:string){
        try{
            const verify=await this.nodemailer.sendEmailVerification(email,username,true)
           
            return {
                status:200,
                success:true,
                message:verify
            }
        }catch(err){
            throw err 
        }
    }
    
    async emailVeification(otp:string,email:string){
        try{
            const verify=await this.nodemailer.verifyEmail(otp,email)
            return {
                status:200,
                success:true,
                data:verify
            }
        }catch(err){
            throw err
        }
    }
}