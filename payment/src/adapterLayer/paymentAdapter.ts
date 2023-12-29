import { Next, Req, Res } from "../infrastructureLayer/types/expressTypes";
import { PaymentUsecase } from "../usecaseLayer/usecase/paymentusecase";
import crypto from "crypto";

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

    async paymentVerification(req:Req,res:Res,next:Next){
        console.log(req.body)
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          req.body;
      
        const body = razorpay_order_id + "|" + razorpay_payment_id;
      
        const expectedSignature = crypto
          .createHmac("sha256",'yze5eVVwqu4HcpTWr51Vm76A')
          .update(body.toString())
          .digest("hex");
      
        console.log(expectedSignature)
        const isAuthentic = expectedSignature === razorpay_signature;
        console.log(isAuthentic)
        if(isAuthentic){
          res.redirect(
            `http://localhost:3000/payment/success`
          );
        }
      
      };
}