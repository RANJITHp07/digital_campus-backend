import { Model } from "mongoose";
import { IClassroomNotification } from "../../../../domainLayer/classroomNotification";
import { IClassroomNotificationModel } from "../../../model/classRoomNotification";

export const  createNotification=async(classroomNotificationModel:Model<IClassroomNotificationModel>,notification: IClassroomNotification): Promise<string>=> {
    try {
        await classroomNotificationModel.create(notification);
        return 'Notification created successfully';
    } catch (error) {
        throw error;
    }
}