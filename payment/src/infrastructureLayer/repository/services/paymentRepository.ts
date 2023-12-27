import Razorpay from 'razorpay';
import { IPayment } from '../../../domainLayer/payment';

export class PaymentRepository {
    private razorpay: any;

    constructor(key_id: string, key_secret: string) {
        this.razorpay = new Razorpay({
            key_id: "rzp_test_f2VkhZBqoeOqME",
            key_secret: 'yze5eVVwqu4HcpTWr51Vm76A',
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
