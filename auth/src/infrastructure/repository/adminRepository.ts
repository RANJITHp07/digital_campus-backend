import { DeepPartial } from "typeorm"
import { IAdmin } from "../../domain/admin"
import { Admin } from "../entities/admin"
import { IAdminRepository } from "../../usecase/interface/adminRepository";

export class AdminRepository implements IAdminRepository {

    constructor(private readonly Admin:any){}

    // to create admin
    async create(newAdmin: IAdmin): Promise<string> {
        try {
            const client = Admin.create(newAdmin as DeepPartial<Admin>);
            await client.save();
            return "Admin successfully created";
        } catch (err) {
            throw err;
        }
    }
   
    async findAdmin(email: string, admin_id?: string): Promise<IAdmin | null> {
        try {
            const whereClause:{email:string,admin_id?:string} = {
                email: email
            };
    
            if (admin_id) {
                whereClause.admin_id = admin_id;
            }
    
            const admin = await Admin.findOne({
                where: whereClause
            });
    
            return admin || null;
        } catch (err) {
            throw err;
        }
    }
    

}
