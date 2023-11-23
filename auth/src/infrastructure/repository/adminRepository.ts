import { DeepPartial } from "typeorm";
import { IAdmin } from "../../domain/admin";
import { IAdminRepository } from "../../usecase/interface/adminRepository";
import { Admin } from "../entities/admin";


export class AdminRepository implements IAdminRepository {

    constructor(Admin:any){}

    async create(newAdmin: IAdmin): Promise<IAdmin>{
       try{
        const admin=Admin.create(newAdmin as DeepPartial<Admin>);
        await admin.save()
       return admin
       }catch(err){
        throw err
       }
    }

    async findAdmin(email: string):Promise<IAdmin | null>{
       try{
        const admin=await Admin.findOne({  
            where:{
                email:email
            }
          })

         return admin  
       }catch(err){
        throw err
       }
    }
}