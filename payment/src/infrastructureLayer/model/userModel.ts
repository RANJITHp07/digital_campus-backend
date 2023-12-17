import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IPaymentModel extends Document {
   _id:Schema.Types.ObjectId,
   planName:string,
   amount:number,
   username:string,
   email:string,
   plan_id:string,
   interval:number
}

const paymentSchema = new Schema<IPaymentModel>({
    _id: { type: Schema.Types.ObjectId}, // Assuming _id is optional
    planName: { type: String },
    amount: { type: Number },
    username: { type: String },
    email: { type: String },
    plan_id: { type: String },
    interval: { type: Number },
});

export const PaymentModel = mongoose.model<IPaymentModel>('Payment', paymentSchema);
