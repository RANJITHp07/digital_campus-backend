import { IUser } from "../../../../domainLayer/user";
import { Users } from "../../../entities/user";
import { redis } from "../../../config/redis";

export const findUser = async (
  email: string,
  usersModel: typeof Users
): Promise<IUser | null> => {
  try {
    const cachedUser = await redis.get(email);
    if (cachedUser) {
      return JSON.parse(cachedUser);
    }

    const user = await usersModel.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      await redis.set(email, JSON.stringify(user));
      await redis.expire(email, 3600);
      return user;
    }

    return null;
  } catch (error) {
    throw error;
  }
};
