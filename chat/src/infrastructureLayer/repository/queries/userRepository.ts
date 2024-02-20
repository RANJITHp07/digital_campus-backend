import { Model, Types } from "mongoose";
import IUser from "../../../domainLayer/user";
import { IUserRepository } from "../../../usecaseLayer/interface/userRepository";
import  { IUserModel } from "../../model/users";
import { createUser, findUser, updateUser } from "./user/index";

export default class UserRepository implements IUserRepository {
  constructor(private readonly userModel: Model<IUserModel>) {}

  //to create the user
  async create(user: IUser): Promise<string> {
    return createUser(this.userModel, user)
  }

  //to update the user
  async update(id: number, update: Partial<IUser>): Promise<string> {
    return updateUser(this.userModel, id, update)
  }

  //to find the user
  async finduser(id: string): Promise<IUserModel | null> {
    return findUser(this.userModel,id)
  }
}
