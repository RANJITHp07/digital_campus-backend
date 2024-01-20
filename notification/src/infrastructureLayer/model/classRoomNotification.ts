import mongoose, { Schema, Document } from 'mongoose';

export interface IClassroomNotificationModel extends Document {
    user_id:string,
    classroom_id: string;
    className: string;
    message: string;
    isRead: boolean;
}

const ClassroomNotificationSchema: Schema = new Schema({
    user_id: { type: String,required:true},
    classroom_id: { type: String},
    className: { type: String },
    reason:{type: String},
    message: { type: String },
    isRead: { type: Boolean, default: false },
});

const ClassroomNotificationModel = mongoose.model<IClassroomNotificationModel>('ClassroomNotification', ClassroomNotificationSchema);

export default ClassroomNotificationModel;
