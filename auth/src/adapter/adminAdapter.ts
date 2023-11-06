import { Next, Req, Res } from "../infrastructure/types/expressTypes";
import { Adminusecase } from "../usecase/adminusecase";

export class AdminAdapter{
   
    private readonly adminusecase:Adminusecase

    constructor(adminusecase:Adminusecase){
        this.adminusecase = adminusecase;
    }


    async create(req:Req,res:Res,next:Next){
        try{
           const newAdmin=await this.adminusecase.createAdmin(req.body);
           res.status(newAdmin.status).json({
            success:newAdmin.success,
            message:newAdmin.message
           })
        }catch(err){
            next(err)
        }
    }

    async adminLogin(req:Req,res:Res,next:Next){
        try{
            const {email,admin_id,password} = req.body
           const admin=await this.adminusecase.adminLogin(email,admin_id,password)
           res.status(admin.status).json({
            success:admin.success,
            message:admin.message,
           })
        }catch(err){
            next(err)
        }
    }

    async findAdmin(req:Req,res:Res,next:Next){
        try{
           const admin=await this.adminusecase.findAdmin(req.params.email);
           res.status(admin.status).json({
            success:admin.success,
            data:admin.data
           })
        }catch(err){
               next(err)
        }
    }

    // sending the admin_id
    async sendEmail(req:Req,res:Res,next:Next){
        try{
             const {email,username}=req.body
             const  admin_id=await this.adminusecase.verifyEmail(email,username);
             res.status(admin_id.status).json({
                success:admin_id.success,
                 message:admin_id.message
             })
        }catch(err){
            next(err)
        }
    }
}