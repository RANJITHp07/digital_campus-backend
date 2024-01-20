import Razorpay from "razorpay";
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
           console.log(subscription.data)
           res.status(subscription.status).json({
            success:subscription.success,
            data:subscription.data
           })
        }catch(err){
            next(err)
        }
    }

    async  paymentVerification(req:Req,res:Res,next:Next) {
      console.log(req.body);
      const { razorpay_subscription_id, razorpay_payment_id, razorpay_signature } =
        req.body;
    
      const body = razorpay_subscription_id + "|" + razorpay_payment_id;
    
      // Validate the webhook signature
      const isValid = Razorpay.validateWebhookSignature(
        body,
        razorpay_signature,
        'J0KIUV5vkI8KZ1xW7CFWu0y9'
      );
    
      console.log("isValid:", isValid);
    
      // Calculate the expected signature
      const expectedSignature = crypto
        .createHmac("sha256", 'J0KIUV5vkI8KZ1xW7CFWu0y9')
        .update(body, 'utf-8')
        .digest("hex");
    
      console.log("expectedSignature:", expectedSignature);
    
      // Check if the calculated signature matches the received signature
      const isAuthentic = expectedSignature === razorpay_signature;
    
      console.log("isAuthentic:", isAuthentic);
    
      if (isAuthentic) {
        res.redirect(`https://digital-campus.vercel.app/payment/success`);
      } else {
        res.status(403).send("Invalid signature");
      }
    }
}