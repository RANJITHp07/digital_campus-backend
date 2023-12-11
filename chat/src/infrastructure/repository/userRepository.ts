import IUser from "../../domain/user"
import UserModel from "../model/users"

export default class UserRepository{
    constructor(UserModel:any){}

    async create(user:IUser):Promise<string>{
        try{
           await UserModel.create(user);
            return "created"
        }catch(err){
            throw err
        }
    }

    async update(id:number,update:Partial<IUser>):Promise<string>{
        try{
            await UserModel.findOneAndUpdate({user_id:id},{$set:update})
            return "updated"
        }catch(err){
            throw err
        }
    }

    async finduser(id:string){
        try{ 
               const user=await UserModel.findOne({user_id:id})
               return user
        }catch(err){
            throw err
        }
    }
}
