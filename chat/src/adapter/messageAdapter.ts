import IMessage from "../domain/message";
import { Next, Req, Res } from "../infrastructure/types/expressTypes";
import { Messageusecase } from "../usecase/messageusecase";

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
          const message = await this.messageusecase.getMessage(req.params.id);
          res.status(message.status).json({
            success: message.success,
            data: message.data
          })
        }catch(err){
            next(err)
        }
    }
}