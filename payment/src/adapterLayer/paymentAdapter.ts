import { Next, Req, Res } from "../infrastructureLayer/types/expressTypes";
import { PaymentUsecase } from "../usecaseLayer/paymentusecase";

export class PaymentAdapter{

    private readonly paymentusecase:PaymentUsecase
    constructor(paymentusecase:PaymentUsecase){
          this.paymentusecase = paymentusecase;
    }


    async createSubscription(req:Req,res:Res,next:Next){
        try{
           const subscription=await this.paymentusecase.createSubscription(req.body)
           res.status(subscription.status).json({
            success:subscription.success,
            data:subscription.data
           })
        }catch(err){
            next(err)
        }
    }
}