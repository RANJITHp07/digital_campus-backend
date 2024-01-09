import { IPayment } from "../../domainLayer/payment";
import { PaymentRepository } from "../../infrastructureLayer/repository/services/paymentRepository";
import RequestValidator from "../../infrastructureLayer/repository/services/validatorRepository";
import ErrorResponse from "./../handler/errorResponse";

export class PaymentUsecase{
    
    private readonly paymentrepository:PaymentRepository
    private readonly requestValidator:RequestValidator
    
    constructor(paymentrepository:PaymentRepository,requestValidator:RequestValidator){
        this.paymentrepository=paymentrepository;
        this.requestValidator=requestValidator;
    }


    async createSubscription({plan_id,email,username,planName,amount,interval}:IPayment){
        try{
            // console.log(plan_id,email,username,planName,amount,interval)
            // const validation=this.requestValidator.validateRequiredFields(
            //     {planName,plan_id,email,username,amount,interval},
            //     ["planName","plan_id","email","amount","username","interval"]
            //     );
              
            //     if (!validation.success) {
            //         throw ErrorResponse.badRequest(validation.message as string)
            //     }

                const razorpay=await this.paymentrepository.createPayment({plan_id,email,username,planName,amount,interval})
                if(razorpay)return {
                    status:200,
                    success:true,
                    data:razorpay
                }
                throw ErrorResponse.badRequest("Some error in the razor pay")
        }catch(err){
            throw err
        }
    }

    // async paymentVerification(){
    //     console.log(req.body)
    //     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    //       req.body;
      
    //     const body = razorpay_order_id + "|" + razorpay_payment_id;
      
    //     const expectedSignature = crypto
    //       .createHmac("sha256",'yze5eVVwqu4HcpTWr51Vm76A')
    //       .update(body.toString())
    //       .digest("hex");
      
    //     console.log(expectedSignature)
    //     const isAuthentic = expectedSignature === razorpay_signature;
    //     console.log(isAuthentic)
    //     if(true){
    //       res.redirect(
    //         `https://digital-campus.vercel.app/payment/success`
    //       );
    //     }
      
    //   };
}