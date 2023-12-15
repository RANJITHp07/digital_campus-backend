import mongoose, { Document, Schema } from 'mongoose';

// Define the Plan interface
export interface IPlan extends Document {
    planName: string;
    interval: number;
    details: string[];
}

const planSchema = new Schema<IPlan>({
    planName: {
        type: String,
        required: true,
    },
    interval: {
        type: Number,
        required: true,
    },
    details: {
        type: [String], 
        required: true,
    },
},{
    timestamps:true
});

const PlanModel = mongoose.model<IPlan>('Plan', planSchema);
export default PlanModel;
