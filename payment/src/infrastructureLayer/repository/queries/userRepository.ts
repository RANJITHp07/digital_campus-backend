import { PaymentModel } from "../../model/userModel"

export class UserRepository{
 
    async create(user:{username:string,email:string}){
        try{
            await PaymentModel.create(user);
            return "successfully created new user"
        }catch(err){
            throw err
        }
    }
}