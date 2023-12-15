import { IUser } from "../../domainLayer/user";
import Encrypt from "../../infrastructure/repository/services/bcryptRepository";
import jwtPassword from "../../infrastructure/repository/services/jwtRepository";
import Listener from "../../infrastructure/repository/rabbitmq/listenrepository";
import Nodemailer from "../../infrastructure/repository/services/nodemailer";
import Publisher from "../../infrastructure/repository/rabbitmq/publishrepository";
import { UserRepository } from "../../infrastructure/repository/queries/userRepository";
import RequestValidator from "../../infrastructure/repository/services/validatorRepository";
import errorResponse from "../handler/errorResponse";


export class Userusecase{
    private readonly userRepository: UserRepository
    private readonly bcrypt: Encrypt
    private readonly jwt: jwtPassword
    private readonly nodemailer:Nodemailer
    private readonly listner:Listener
    private readonly publish:Publisher
    private readonly requestValidator:RequestValidator
    

    constructor(
        userRepository:UserRepository, bcrypt:Encrypt, jwt: jwtPassword,nodemailer:Nodemailer,publish:Publisher,listner:Listener,requestValidator:RequestValidator){
        this.userRepository = userRepository;
        this.bcrypt = bcrypt;
        this.jwt=jwt
        this.nodemailer=nodemailer,
        this.publish=publish
        this.listner=listner
        this.requestValidator=requestValidator
    }

    //to create user
    async createUser({ firstName, lastName, username, email, password }: { firstName: string; lastName: string; username: string; email: string; password: string }){
        try{

             // Validate required parameters
        const validation = this.requestValidator.validateRequiredFields(
            { firstName, lastName, username, email, password },
            ['firstName', 'lastName', 'username', 'email', 'password']
        );
        console.log(validation)

        if (!validation.success) {
            throw errorResponse.badRequest(validation.message as string)
        }

           const user=await this.userRepository.findUser(email); // checking if the user exist or not
           if(!user){
                const hashedPassword=await this.bcrypt.createHash(password);
                const newUser={firstName,lastName,email,username,password:hashedPassword}
                const createnewUser=await this.userRepository.createUser(newUser);
                await this.publish.publish("authExchange","createroute",{id:createnewUser.id,username,email,profile:createnewUser.profile})
                return{
                        status:200,
                        success:true,
                        message:"Successfully created"
                    } 
                }
                throw errorResponse.badRequest("User already exist")
        }catch(err){
            throw err
        }
    }


    // allow login of the user
    async loginUser({email,password}:{email:string,password:string}){
        try{
        // Validate required parameters
        const validation = this.requestValidator.validateRequiredFields(
            { email, password },
            ['email', 'password']
        );

        if (!validation.success) {
            throw errorResponse.badRequest(validation.message as string)
        }


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
                
               }
                throw errorResponse.badRequest("Wrong password")
            }
            
          throw errorResponse.notFound("Wrong email id")
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
    async updateUser({id,update}:{id:number,update:Partial<IUser>}){
        try{

        // Validate required parameters
        const validation = this.requestValidator.validateRequiredFields(
            { id, update },
            ['id', 'update']
        );

        if (!validation.success) {
            throw errorResponse.badRequest(validation.message as string)
        }

            if(update.password){
                update.password=await this.bcrypt.createHash(update.password)
            }
          const updatedUser=await this.userRepository.update(id,update)
          if(update.profile && updatedUser){
            await this.publish.publish("exchange1","updateProfile",{profile:updatedUser.profile})
          }
          if(updatedUser)
          return {
            status:200,
            success:true,
            message:"Successfully updated"
          }
           throw errorResponse.badRequest("Wrong id")
        }catch(err){
            throw err
        }
    }

    //to send OTP to verify the user's detail
    async verifyEmail({email,username}:{email:string,username:string}){
        try{
             // Validate required parameters
        const validation = this.requestValidator.validateRequiredFields(
            { email, username },
            ['id', 'update']
        );

        if (!validation.success) {
            throw errorResponse.badRequest(validation.message as string)
        }

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
    async emailVeification({otp,email}:{otp:string,email:string}){
        try{

        // Validate required parameters
        const validation = this.requestValidator.validateRequiredFields(
            { email, otp },
            ['email', 'otp']
        );

        if (!validation.success) {
            throw errorResponse.badRequest(validation.message as string)
        }

            const verify=await this.nodemailer.verifyEmail(otp,email)
            if(verify){
                return {
                    status:200,
                    success:true,
                    data:"Succesfully logged In"
                }
            }
           throw errorResponse.badRequest("Wrong OTP")
        }catch(err){
            throw err
        }
    }


    async checkPassword(bcryptPassword: string, oldPassword: string, newPassword: string, id: number) {
        try {


            // Validate required parameters
        const validation = this.requestValidator.validateRequiredFields(
            { bcryptPassword,oldPassword,newPassword,id },
            ['bcryptPassword', 'oldPassword','newPassword','id']
        );

        if (!validation.success) {
            throw errorResponse.badRequest(validation.message as string)
        }

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
                } 
                throw errorResponse.badRequest("Old password not matching")
            } 
            throw errorResponse.notFound("No such user")
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