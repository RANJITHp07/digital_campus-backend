import IJWT from "../../usecase/interface/jwt";
import jwt from "jsonwebtoken"

class jwtPassword implements IJWT{
    createJWT(userId:number): string {
        const jwtKey=process.env.JWT_KEY
        if (jwtKey) {
            const token:string = jwt.sign(
              { id: userId},
              jwtKey
            );
            return token
          }
          throw new Error("JWT_KEY is not defined");
    }
}


export default jwtPassword