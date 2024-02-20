import { Model, Types } from "mongoose";
import { IUserModel } from "../../../model/users";
import { redis } from "../../../config/redis";

export const findUser=async(userModel:Model<IUserModel>,id:string): Promise<IUserModel | null>=>{
    try {
        const cachedUser=await redis.get(id)
        if(cachedUser){
            return JSON.parse(cachedUser)
        }
      const user = await userModel.findOne({ user_id: id });
      return user;
    } catch (err) {
      throw err;
    }
  }