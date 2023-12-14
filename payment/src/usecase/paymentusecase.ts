import { IPayment } from "../domain/payment";
import { PaymentRepository } from "../infrastructure/repository/paymentRepository";
import RequestValidator from "../infrastructure/repository/validatorRepository";
import ErrorResponse from "./handler/errorResponse";

export class PaymentUsecase{
    
    private readonly paymentrepository:PaymentRepository
    private readonly requestValidator:RequestValidator
    
    constructor(paymentrepository:PaymentRepository,requestValidator:RequestValidator){
        this.paymentrepository=paymentrepository;
        this.requestValidator=requestValidator;
    }


    async createSubscription({plan_id,email,username,planName,amount,interval}:IPayment){
        try{
            const validation=this.requestValidator.validateRequiredFields(
                {planName,plan_id,email,username,amount,interval},
                ["planName","plan_id","email","amount","username","interval"]
                );
              
                if (!validation.success) {
                    throw ErrorResponse.badRequest(validation.message as string)
                }

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
}