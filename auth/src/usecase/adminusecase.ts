import { IAdmin } from "../domain/admin";
import { AdminRepository } from "../infrastructure/repository/adminRepository";
import Encrypt from "../infrastructure/repository/bcryptRepository";
import Nodemailer from "../infrastructure/repository/nodemailer";

export class Adminusecase{


    private readonly adminRepository: AdminRepository
    private readonly  bcrypt: Encrypt
    private readonly nodemailer:Nodemailer

    constructor(adminRepository: AdminRepository,bcrypt: Encrypt,nodemailer:Nodemailer){    //depedency injection 
         this.adminRepository = adminRepository;              
         this.bcrypt = bcrypt;
         this.nodemailer = nodemailer;
    }

    async createAdmin(admin:IAdmin){
        try{
            const existingAdmin=await this.adminRepository.findAdmin(admin.email)
            if(!existingAdmin){
                
                const newAdmin=await this.adminRepository.create(admin);
                return {
                 status:200,
                 success:true,
                 message:newAdmin
                }
            }
            
            return {
                status:200,
                success:false,
                message:"User already Exist"
            }
        }catch(err){
            throw err
        }
    }

    async adminLogin(email:string,admin_id:string,password:string){
        try{
           const admin=await this.adminRepository.findAdmin(email,admin_id);
           if(admin){
             if(await this.bcrypt.compare(password,admin.password)){
                return {
                    status:200,
                    success:true,
                    message:"Successfully logged In"
                }
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
                message:"Wrong email"
            }
           }
        }catch(err){
            throw err
        }
    }


    async findAdmin(email:string){
        try{
           const admin= await this.adminRepository.findAdmin(email);
           return admin ?
           {
            status:200,
            success:true,
            data:admin
           }
           :
           {
            status:200,
            success:false,
            message:"No such user"
           }
        }catch(err){
            throw err
        }
    }

    async verifyEmail(email:string,username:string){
        try{
            const verify=await this.nodemailer.sendEmailVerification(email,username,false)
            return {
                status:200,
                success:true,
                message:verify
            }
        }catch(err){
            throw err 
        }
    }
}