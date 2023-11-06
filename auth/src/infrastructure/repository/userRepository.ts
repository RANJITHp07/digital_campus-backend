import { DeepPartial } from "typeorm";
import { IUser } from "../../domain/user";
import { IUserRepository } from "../../usecase/interface/userRepository";
import { Users } from "../entities/user";


export class UserRepository  implements IUserRepository{

    constructor(private Users: any) {}
    
    //to create user 
    async createUser(newUser:IUser):Promise<string> {
            try{
                const client= Users.create(newUser as DeepPartial<Users>);

                await client.save()
                return "Successfully created"
            }catch(err){
                throw err
            }
    }

     // checking whether a user exist using email
    async findUser(email:string):Promise<IUser | null>{
          try{
              const user=await Users.findOne({  
                where:{
                    email:email
                }
              })
              if(user) return user

              return null
          }catch(err){
            throw err
          }
    }

    //to find all the users 
    async findAll():Promise<IUser[]>{
        try{
           const allUsers:IUser[]=await Users.find();
           return  allUsers
        }catch(err){
            throw err
        }
    }

}