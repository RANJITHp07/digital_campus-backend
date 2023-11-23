import { DeepPartial } from "typeorm";
import { IUser } from "../../domain/user";
import { IUserRepository } from "../../usecase/interface/userRepository";
import { Users } from "../entities/user";


export class UserRepository  implements IUserRepository{

    constructor(private readonly Users: any) {}
    
    //to create user 
    async createUser(newUser:IUser):Promise<IUser & { id: number }> {
            try{
                const client= Users.create(newUser as DeepPartial<Users>);
                await client.save()
                return client
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

    //to update the user details
    async update(id:number,update:Partial<IUser>):Promise<IUser | null >{
        try{
            const user=await Users.findOne({  
                where:{
                   id:id
                }
              })
           if(user){
            Object.assign(user, update);//to merge both objects
             await Users.save(user); 
      
            return user;
           }
           return null
        }catch(err){
            throw err
        }
    }

    async  getAllParticipants(data: any) {
        try {
        //   const participants = await Users.find({
        //     select: ['id', 'username', 'profile'],
        //     where: { id: parseInt('b1e82c7c-a026-46f9-aaf4-8954d1254744')},
        //   });
      
        //   return participants;
        console.log(data)
        } catch (err) {
          throw err;
        }
      }

      async checkPassword(password: string){
        const user=await Users.findOne({  
            where:{
               password:password
            }
          })
          return user
      }

}