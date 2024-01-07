import { AdminRepository } from "../../infrastructureLayer/repository/queries/adminRepository";
import Encrypt from "../../infrastructureLayer/repository/services/bcryptRepository";
import jwtPassword from "../../infrastructureLayer/repository/services/jwtRepository";

export class Adminusecase {
  private readonly adminRepository: AdminRepository;
  private readonly bcrypt: Encrypt;
  private readonly jwt: jwtPassword;

  constructor(
    adminRepository: AdminRepository,
    bcrypt: Encrypt,
    jwt: jwtPassword
  ) {
    (this.adminRepository = adminRepository),
      (this.bcrypt = bcrypt),
      (this.jwt = jwt);
  }

  //to check whether a admin is created if not create a admin and also to check whether the
  //credentials entered is true or not
  async createAdmin(email: string, password: string) {
    try {
      const admin = await this.adminRepository.findAdmin(email);
      console.log(admin);
      if (admin && admin.id) {
        if (await this.bcrypt.compare(password, admin.password)) {
          const token = this.jwt.createJWT(admin?.id, admin.email, "admin", "");
          return {
            status: 200,
            success: true,
            token: token,
            message: "Successfully logged in",
          };
        } else {
          return {
            status: 401,
            message: "Wrong credientials",
          };
        }
      } else {
        if (password === process.env.CREDENTIALS) {
          const hashedPassword = await this.bcrypt.createHash(password);
          const admin = await this.adminRepository.create({
            email,
            password: hashedPassword,
          });
          if (admin.id) {
            const token = this.jwt.createJWT(
              admin?.id,
              admin.email,
              "admin",
              ""
            );
            return {
              status: 200,
              success: true,
              token: token,
              message: "Successfully logged in",
            };
          }
        } else {
          return {
            status: 401,
            message: "Wrong credentials",
          };
        }
      }
    } catch (err) {
      throw err;
    }
  }
}
