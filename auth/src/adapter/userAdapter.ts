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
             console.log(newUser)
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
          res.status(getUser.status).json({
            success: getUser.success,
            data:getUser.data,
            message:getUser.message
          })
       }catch(err){
        next(err)
       }
    }

    async updateUser(req:Req,res:Res,next:Next){
      try{
         const {id,update}=req.body
         const updateUser=await this.userusecase.updateUser(id,update)
         res.status(updateUser.status).json({
          success: updateUser.success,
          message: updateUser.message
        })
      }catch(err){
        next(err)
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

    async resetPassword(req:Req,res:Res,next:Next){
      try{
        const user=await this.userusecase.checkPassword(req.body.id,req.body.password)
        res.status(user.status).json({
          message:user.message
        }
        )
     }catch(err){
         next(err)
     }
    }
}