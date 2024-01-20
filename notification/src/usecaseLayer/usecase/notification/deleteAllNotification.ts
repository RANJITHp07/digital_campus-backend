import { IClassRoomNotificationRepository } from "../../interface/IClassroomNotification";
import { Response } from "../../interface/Response";

export const deleteAllNotification=async(notificationRepository:IClassRoomNotificationRepository,userId:string):Promise<Response>=>{
     const deleteAllNotification=await notificationRepository.deleteAllNotifications(userId)
     return {
        status:201,
        success:true,
        message: deleteAllNotification
     }
}