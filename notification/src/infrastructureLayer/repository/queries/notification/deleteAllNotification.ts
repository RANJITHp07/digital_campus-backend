import { Model } from "mongoose";
import { IClassroomNotificationModel } from "../../../model/classRoomNotification";

export const deleteNotification = async (classroomNotificationModel: Model<IClassroomNotificationModel>, userId: string): Promise<string> => {
    try {
        const deletedNotification = await classroomNotificationModel.deleteMany({ user_id: userId });
        if (deletedNotification.deletedCount === 0) {
            return 'No notifications found for deletion';
        }
        return `Successfully deleted ${deletedNotification.deletedCount} notifications`;
    } catch (error) {
        throw error;
    }
};
