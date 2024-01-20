import { Model } from "mongoose";
import { IClassroomNotificationModel } from "../../../model/classRoomNotification";

export const deleteOneNotification=async(classroomNotificationModel:Model<IClassroomNotificationModel>,id: string): Promise<boolean>=>{
    try {
       const deletedNotification=await classroomNotificationModel.findByIdAndDelete(id);
        return  deletedNotification ? true : false
    } catch (error) {
        throw error;
    }
}