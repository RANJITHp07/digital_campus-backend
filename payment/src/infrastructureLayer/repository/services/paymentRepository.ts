import Razorpay from 'razorpay';
import { IPayment } from '../../../domainLayer/payment';

export class PaymentRepository {
    private razorpay: any;

    constructor(key_id: string, key_secret: string) {
        this.razorpay = new Razorpay({
            key_id: "rzp_test_h3vLvQM9ENsdGj",
            key_secret: 'J0KIUV5vkI8KZ1xW7CFWu0y9',
        });
    }

    async createPayment(payment: IPayment) {
        try {
            const razorpayPlan = await this.razorpay.subscriptions.create({
                plan_id:'plan_NDHsyIEFMzLGnH',
                customer_notify:1,
                total_count:1,
            });
            return razorpayPlan;
        } catch (err) {
            throw err;
        }
    }

    
}
