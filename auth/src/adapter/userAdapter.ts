import { Next, Req, Res } from "../infrastructure/types/expressTypes";
import { Userusecase } from "../usecase/userusecase";

export class  UserAdapter{
   
    private readonly userusecase: Userusecase

    constructor(userusecase:Userusecase){
          this.userusecase = userusecase  // using dependency injection to call the userusecase
    } 

    async createUser(req:Req,res:Res,next:Next){
          try{
             const {firstName,lastName,username,password,email,}=req.body
             const newUser= await this.userusecase.createUser(firstName,lastName,username,email,password)
             res.status(newUser.status).json({
                success:newUser.success,
                message:newUser.message
             })
          }catch(err){
            next(err)
          }
    }

    async loginUser(req:Req,res:Res,next:Next){
        try{
             const {email,password} = req.body;
             const user=await this.userusecase.loginUser(email,password);
              user && res.status(user.status).json({
                success:user.success,
                data:user.data,
                message:user.message
             })
        }catch(err){
            next(err)
        }
    }


    async getAllusers(req:Req,res:Res,next:Next){
      try{
          const allUsers=await this.userusecase.getAllUsers();
          res.status(allUsers.status).json({
            success:allUsers.success,
            data:allUsers.data
          })
      }catch(err){
        next(err)
      }
    }


    async getUser(req:Req,res:Res,next:Next){
       try{
          const getUser=await this.userusecase.getUser(req.params.email);
          res.status(200).json({
            success: getUser.success,
            data:getUser.data,
            message:getUser.message
          })
       }catch(err){
        throw err
       }
    }

    async sendEmail(req:Req,res:Res,next:Next){
      try{
        const user=await this.userusecase.verifyEmail(req.body.email,req.body.username)
        res.status(user.status).json({
          success:user.success,
          message:user.message
        })
     }catch(err){
         next(err)
     }
    }

    //to verify whether the otp send through the email is same as that of the user
    async emailVerification(req:Req,res:Res,next:Next){
      try{
        const user=await this.userusecase.emailVeification(req.body.otp,req.body.email)
        res.status(user.status).json({
          success:user.success,
          data:user.data
        }
        )
     }catch(err){
         next(err)
     }
    }
}