import { IUser } from "../../domain/user";

export interface IUserRepository {
    createUser(newUser:IUser):Promise<IUser>;
    findUser(email:string):Promise<IUser | null>;
    findAll():Promise<IUser[]>
    update(id:number,update:Partial<IUser>):Promise<IUser | null >
}