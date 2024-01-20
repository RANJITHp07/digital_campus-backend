import { IClassRoomNotificationRepository } from "../../interface/IClassroomNotification";
import { Response } from "../../interface/Response";

export const getAllNotification=async(notificationRepository:IClassRoomNotificationRepository,userId:string):Promise<Response>=>{
     const getAllNotification=await notificationRepository.getAllNotification(userId)
     return {
        status:201,
        success:true,
        data:getAllNotification
     }
}