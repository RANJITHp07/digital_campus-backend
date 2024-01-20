import ErrorResponse from "../../handler/errorResponse";
import { IClassRoomNotificationRepository } from "../../interface/IClassroomNotification";
import { Response } from "../../interface/Response";

export const deleteOneNotification=async(notificationRepository:IClassRoomNotificationRepository,id:string):Promise<Response> => {
     const deleteOneNotification=await notificationRepository.deleteOneNotification(id)
    if(deleteOneNotification){
     return {
        status:201,
        success:true,
        message:"Deleted the notification"
     }
    }
    throw ErrorResponse.badRequest("Wrong notification id")

   
}