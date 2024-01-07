import { DeepPartial } from "typeorm";
import { IAdmin } from "../../../domainLayer/admin";
import { IAdminRepository } from "../../../usecaseLayer/interface/adminRepository";
import { Admin } from "../../entities/admin";

export class AdminRepository implements IAdminRepository {
  constructor(private AdminModel: typeof Admin) {}

  // Create a new admin
  async create(newAdmin: IAdmin): Promise<IAdmin> {
    try {
      const admin = this.AdminModel.create(newAdmin as DeepPartial<Admin>);
      await admin.save();
      return admin;
    } catch (error) {
      throw error;
    }
  }

  // Find an admin by email
  async findAdmin(email: string): Promise<IAdmin | null> {
    try {
      const admin = await this.AdminModel.findOne({
        where: {
          email: email,
        },
      });

      return admin || null;
    } catch (error) {
      throw error;
    }
  }
}
