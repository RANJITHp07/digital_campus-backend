import { IUser } from "../../domain/user";

export interface IUserRepository {
    createUser(newUser:IUser):Promise<string>;
    findUser(email:string):Promise<IUser | null>;
    findAll():Promise<IUser[]>
}