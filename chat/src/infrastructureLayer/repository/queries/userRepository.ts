import IUser from "../../../domainLayer/user";
import { IUserRepository } from "../../../usecaseLayer/interface/userRepository";
import UserModel, { IUserModel } from "../../model/users";

export default class UserRepository implements IUserRepository {
  constructor(private readonly UserModel: any) {}

  //to create the user
  async create(user: IUser): Promise<string> {
    try {
      await UserModel.create(user);
      return "created";
    } catch (err) {
      throw err;
    }
  }

  //to update the user
  async update(id: number, update: Partial<IUser>): Promise<string> {
    try {
      console.log(id, update);
      await UserModel.findOneAndUpdate({ user_id: id }, { $set: update });
      return "updated";
    } catch (err) {
      throw err;
    }
  }

  //to find the user
  async finduser(id: string): Promise<IUserModel | null> {
    try {
      const user = await UserModel.findOne({ user_id: id });
      return user;
    } catch (err) {
      throw err;
    }
  }
}
