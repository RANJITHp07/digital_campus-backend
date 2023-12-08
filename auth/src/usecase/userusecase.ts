import { IUser } from "../domain/user";
import Encrypt from "../infrastructure/repository/bcryptRepository";
import jwtPassword from "../infrastructure/repository/jwtRepository";
import Listener from "../infrastructure/repository/listenrepository";
import Nodemailer from "../infrastructure/repository/nodemailer";
import Publisher from "../infrastructure/repository/publishrepository";
import { UserRepository } from "../infrastructure/repository/userRepository";


export class Userusecase{
    private readonly userRepository: UserRepository
    private readonly bcrypt: Encrypt
    private readonly jwt: jwtPassword
    private readonly nodemailer:Nodemailer
    private readonly listner:Listener
    private readonly publish:Publisher
    

    constructor(userRepository:UserRepository, bcrypt:Encrypt, jwt: jwtPassword,nodemailer:Nodemailer,publish:Publisher,listner:Listener){
        this.userRepository = userRepository;
        this.bcrypt = bcrypt;
        this.jwt=jwt
        this.nodemailer=nodemailer,
        this.publish=publish
        this.listner=listner
    }



    //to create user
    async createUser(firstName:string,lastName:string,username:string,email:string,password:string){
        try{
           const user=await this.userRepository.findUser(email); // checking if the user exist or not
    
           if(!user){
                const hashedPassword=await this.bcrypt.createHash(password);
                const newUser={firstName,lastName,email,username,password:hashedPassword}
                const createnewUser=await this.userRepository.createUser(newUser);
                await this.publish.publish("exchange1","createroute",{id:createnewUser.id,username,email})
                return{
                        status:200,
                        success:true,
                        message:"Successfully created"
                    } 
                }
           else{
            return {
                status:401,
                success:false,
                message:"User Already exist"
            }
           }
        }catch(err){
            throw err
        }
    }


    // allow login of the user
    async loginUser(email:string,password:string){
        try{
            const user:IUser | null=await this.userRepository.findUser(email);

            if(user && user.id){
                const match:boolean=await this.bcrypt.compare(password,user.password);
               if(match){
               
                    const token=this.jwt.createJWT(user.id,user.email,"user",user.username)
                    return {
                      status:200,
                      success:true,
                      data:token,
                      message:"Sucessfully logged In"
                    }
                
               }else{
                return {
                    status:401,
                    success:false,
                    message:"Wrong password"
                  }
               }
            }else{
                return {
                    status:401,
                    success:false,
                    message:"Wrong email id"
                  }
            }
        }catch(err){
            throw err
        }
    }

    //to find the user using email
    async getUser(email:string){
        try{
             const user=await this.userRepository.findUser(email);
              return user ?
              {
                 status:200,
                 success:true,
                 data:user
              }:
              {
                 status:200,
                success:false,
                message:"No such user"
              }
        }catch(err){
            throw err
        }
    }


    //to update the user details
    async updateUser(id:number,update:Partial<IUser>){
        try{
            if(update.password){
                update.password=await this.bcrypt.createHash(update.password)
            }
          const updatedUser=await this.userRepository.update(id,update)
          return updatedUser ?
          {
            status:200,
            success:true,
            message:"Successfully updated"
          }
          :
          {   status:401,
              success:false,
              message:"No such user"
          }
        }catch(err){
            throw err
        }
    }

    //to send OTP to verify the user's detail
    async verifyEmail(email:string,username:string){
        try{
            const verify=await this.nodemailer.sendEmailVerification(email,username)
           
            return {
                status:200,
                success:true,
                message:verify
            }
        }catch(err){
            throw err 
        }
    }
    

    //to check if the user entered OTP is correct or not
    async emailVeification(otp:string,email:string){
        try{
            const verify=await this.nodemailer.verifyEmail(otp,email)
            return verify ?
             {
                status:200,
                success:true,
                data:"Succesfully logged In"
            }:
            {
                status:200,
                success:false,
                data:"Wrong Otp"
            }
        }catch(err){
            throw err
        }
    }


    async getAllParticipants(){
        try{
            this.listner.listen("exchange4","details",async(data)=>{
                // const user=await this.jobRepository.find(data.ids)
                //  this.publish.publish("exchange7","Jobs",{user})
                console.log(data)
            })
        }catch(err){
         throw err
      }
    }

    async checkPassword(bcryptPassword: string, oldPassword: string, newPassword: string, id: number) {
        try {

            const user = await this.userRepository.checkPassword(bcryptPassword);
            if (user) {
                if (await this.bcrypt.compare(oldPassword,user.password)) {
                    const hashedPassword = await this.bcrypt.createHash(newPassword);
                    const update = {
                        password: hashedPassword
                    };
                    await this.userRepository.update(id, update);
                    return {
                        status: 200,
                        success: true,
                        message: "Password Changed"
                    };
                } else {
                    return {
                        status: 401,
                        success: false,
                        message: "Old password not matching"
                    };
                }
            } else {
                return {
                    status: 401,
                    success: false,
                    message: "User not found"
                };
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    

    // pagination of the users collection
    async paginateUser(pageNumber:number){
        try{
            const users=await this.userRepository.paginateUsers(pageNumber);
            return {
                status:200,
                data:users
            }
        }catch(err){
            throw err
        }
    }


    //to search user
    async searchUser(query:string,pagination:number){
        try{
       
           const users=await this.userRepository.searchUser(pagination,query);
           return{
            status:200,
            data:users
           }
        }catch(err){
            throw err
        }
    }

    async getAllusers(){
        const users=await this.userRepository.getAlluser()
        return {
            status:200,
            data:users
        }
    }



}