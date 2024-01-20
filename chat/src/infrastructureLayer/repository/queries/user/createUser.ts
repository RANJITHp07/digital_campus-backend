import { Model } from "mongoose";
import IUser from "../../../../domainLayer/user";
import { IUserModel } from "../../../model/users";

export const  createUser=async( userModel:Model<IUserModel>,user:IUser): Promise<string>=>{
    try {
      await userModel.create(user);
      return "created user successfully";
    } catch (err) {
      throw err;
    }
  }