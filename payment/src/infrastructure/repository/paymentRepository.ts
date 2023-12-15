import Razorpay from 'razorpay';
import { IPayment } from '../../domain/payment';

const razorpay = new Razorpay({
    key_id: 'rzp_test_9uGze6KlNX4TFj',
    key_secret: 'SRFAWTmjaiySyM356UJjxc09',
});

export class PaymentRepository {
    async createPayment(payment: IPayment) {
        try{
        const razorpayPlan = await razorpay.plans.create({
            period: 'monthly',
            interval: payment.interval,
            item: {
                name: payment.planName,
                amount: payment.amount,
                currency: 'INR',
            },
            notes: {
                plan_id: payment.plan_id,
                username: payment.username,
                email: payment.email,
            }
            
        });
        return razorpayPlan
    }catch(err){
        throw err
    }
        
    }
    
}
