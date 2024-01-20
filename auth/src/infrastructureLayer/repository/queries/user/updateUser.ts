import { IUser } from "../../../../domainLayer/user";
import { Users } from "../../../entities/user";
import { redis } from "../../../config/redis";

export const updateUser = async (
  id: number,
  update: Partial<IUser>,
  usersModel: typeof Users
): Promise<IUser | null> => {
  try {
    const user = await usersModel.findOne({
      where: {
        id: id,
      },
    });

    if (user) {
      Object.assign(user, update);
      await usersModel.save(user);
      await redis.set(user.email, JSON.stringify(user));
      await redis.expire(user.email, 3600);
      return user;
    }

    return null;
  } catch (error) {
    throw error;
  }
};
