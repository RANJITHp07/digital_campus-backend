import { Model } from "mongoose";
import IUser from "../../../../domainLayer/user";
import { IUserModel } from "../../../model/users";

export const updateUser=async( userModel:Model<IUserModel>,id: number, update: Partial<IUser>): Promise<string>=>{
    try {
      console.log(id, update);
      await userModel.findOneAndUpdate({ user_id: id }, { $set: update });
      return "updated user details";
    } catch (err) {
      throw err;
    }
  }