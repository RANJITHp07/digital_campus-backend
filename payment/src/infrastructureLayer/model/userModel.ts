import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IPaymentModel extends Document {
   planName:string,
   amount:number,
   username:string,
   email:string,
   plan_id:string,
   interval:number
}

const paymentSchema = new Schema<IPaymentModel>({
    planName: { type: String },
    amount: { type: Number },
    username: { type: String },
    email: { type: String },
    plan_id: { type: String },
    interval: { type: Number },
});

export const PaymentModel = mongoose.model<IPaymentModel>('Payment', paymentSchema);
