import { Model, Types } from "mongoose";
import { IUserModel } from "../../../model/users";
import { redis } from "../../../config/redis";

export const findUser=async(userModel:Model<IUserModel>,id:Types.ObjectId): Promise<IUserModel | null>=>{
    try {
        const cachedUser=await redis.get(id.toString())
        if(cachedUser){
            return JSON.parse(cachedUser)
        }
      const user = await userModel.findOne({ user_id: id });
      return user;
    } catch (err) {
      throw err;
    }
  }