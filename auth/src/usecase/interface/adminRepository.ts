import { IAdmin } from "../../domain/admin";

export interface IAdminRepository {
    create(newAdmin: IAdmin): Promise<string>
    findAdmin(email:string):Promise<IAdmin | null>
}