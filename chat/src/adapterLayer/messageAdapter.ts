import IMessage from "../domainLayer/message";
import { Next, Req, Res } from "../infrastructureLayer/types/expressTypes";
import { Messageusecase } from "../usecaseLayer/messageusecase";

export default class Messageadapter{
    private readonly messageusecase:Messageusecase

    constructor(messageusecase:Messageusecase){
      this.messageusecase = messageusecase;
    }


    async createMessage(req:Req,res:Res,next:Next){
        try{
          const message = await this.messageusecase.createMessage(req.body as IMessage);
          res.status(message.status).json({
            success: message.success,
            message: message.message
          })
        }catch(err){
            next(err)
        }
    }

    async getMessage(req:Req,res:Res,next:Next){
        try{
          const skip=req.query.skip as string
          const message = await this.messageusecase.getMessage(req.params.id,parseInt(skip));
          res.status(message.status).json({
            success: message.success,
            data: message.data
          })
        }catch(err){
           console.log(err)
            next(err)
        }
    }
}