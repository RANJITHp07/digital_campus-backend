import { Model } from "mongoose";
import { IClassroomNotification } from "../../../../domainLayer/classroomNotification";
import { IClassroomNotificationModel } from "../../../model/classRoomNotification";

export const getAllNotifications=async(classroomNotificationModel:Model<IClassroomNotificationModel>,userId: string): Promise<IClassroomNotification[]>=>{
    try {
        const notifications = await classroomNotificationModel.find({
            $and: [
                { user_id: userId },
                { isRead: false }
            ]
        })
        return notifications;
    } catch (error) {
        throw error;
    }
}