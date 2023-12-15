import { DeepPartial } from "typeorm";
import { IUser } from "../../../domainLayer/user";
import { IUserRepository } from "../../../usecaseLayer/interface/userRepository";
import { Users } from "../../entities/user";
import { redis } from "../../config/redis";
import { Like,In } from 'typeorm';


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
            const cachedUser= await redis.get(email);
             if(cachedUser){
                return JSON.parse(cachedUser)
             }
              const user=await Users.findOne({  
                where:{
                    email:email
                }
              })
              if(user){
                await redis.set(email,JSON.stringify(user))
                await redis.expire(email, 3600);
                return user
              } 

              return null
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
            await redis.set(user.email,JSON.stringify(user))
            return user;
           }
           return null
        }catch(err){
            throw err
        }
    }

    //to get users data using pagination
    async paginateUsers(pageNumber: number): Promise<IUser[]> {
        try {
          const users = await Users.find({
            skip: (pageNumber - 1) * 1,
            take:1,
          });
          return users;
        } catch (error) {
          throw error;
        }
      }



   //to get the user using filtration
   async searchUser(pageNumber: number, searchQuery: string): Promise<IUser[]> {
  try {
    const users = await Users.find({
      where: [
        { email: Like(`%${searchQuery}%`) },
      ],
      skip: (pageNumber - 1) *2,
      take: 2,
    });
    console.log(searchQuery)

    return users;
  } catch (error) {
    throw error;
  }
}


async getAllparticipants( userIds: number[]): Promise<IUser[]> {
  try {
    const users = await Users.find({
      where: {
        id: In(userIds),
      },
      select:['username','profile',"id"]
    });

    return users;
  } catch (error) {
    throw error;
  }
}

async getAlluser(){
  const user=await Users.find()
  return user
}
   
//to  check the passoword is crct or not
async checkPassword(password: string){
        const user=await Users.findOne({  
            where:{
               password:password
            }
          })
          return user
      }
}