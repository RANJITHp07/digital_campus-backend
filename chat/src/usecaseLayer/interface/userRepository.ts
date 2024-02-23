import IUser from "../../domainLayer/user";

export interface IUserRepository {
  create(user: IUser): Promise<unknown>;
  update(id: number, update: Partial<IUser>): Promise<string>;
  finduser(id: string): Promise<unknown | null>;
}
