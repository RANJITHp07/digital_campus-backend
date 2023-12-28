import { DeepPartial } from 'typeorm';
import { IUser } from '../../../domainLayer/user';
import { IUserRepository } from '../../../usecaseLayer/interface/userRepository';
import { Users } from '../../entities/user';
import { redis } from '../../config/redis';
import { Like, In } from 'typeorm';

export class UserRepository implements IUserRepository {

    constructor(private readonly usersModel: typeof Users) {}

    // Create a user
    async createUser(newUser: IUser): Promise<IUser & { id: number }> {
        try {
            const user = this.usersModel.create(newUser as DeepPartial<Users>);
            await user.save();
            return user;
        } catch (error) {
            throw error;
        }
    }

    // Check if a user exists using email
    async findUser(email: string): Promise<IUser | null> {
        try {
            const cachedUser = await redis.get(email);
            if (cachedUser) {
                return JSON.parse(cachedUser);
            }

            const user = await this.usersModel.findOne({
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
    }

    // Update user details
    async updateUser(id: number, update: Partial<IUser>): Promise<IUser | null> {
        try {
            const user = await this.usersModel.findOne({
                where: {
                    id: id,
                },
            });

            if (user) {
                Object.assign(user, update);
                await this.usersModel.save(user);
                await redis.set(user.email, JSON.stringify(user));
                return user;
            }

            return null;
        } catch (error) {
            throw error;
        }
    }

    // Get users data using pagination
    async paginateUsers(pageNumber: number): Promise<IUser[]> {
        try {
            const users = await this.usersModel.find({
                skip: (pageNumber - 1) * 1,
                take: 1,
            });
            return users;
        } catch (error) {
            throw error;
        }
    }

    // Get users using filtration
    async searchUser(pageNumber: number, searchQuery: string): Promise<IUser[]> {
        try {
            const users = await this.usersModel.find({
                where: [
                    { email: Like(`%${searchQuery}%`) },
                ],
                skip: (pageNumber - 1) * 2,
                take: 2,
            });

            return users;
        } catch (error) {
            throw error;
        }
    }

    // Get all participants by userIds
    async getAllParticipants(userIds: number[]): Promise<IUser[]> {
        try {
            const users = await this.usersModel.find({
                where: {
                    id: In(userIds),
                },
                select: ['username', 'profile', 'id'],
            });

            return users;
        } catch (error) {
            throw error;
        }
    }

    // Get all users
    async getAllUsers(): Promise<IUser[]> {
        const users = await this.usersModel.find();
        return users;
    }

    // Check if the password is correct
    async checkPassword(password: string): Promise<IUser | null> {
        const user = await this.usersModel.findOne({
            where: {
                password: password,
            },
        });

        return user || null;
    }
}
