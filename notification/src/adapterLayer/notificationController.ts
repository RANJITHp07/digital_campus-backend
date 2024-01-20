import { Next, Res, Req } from "../infrastructureLayer/types/expressTypes";
import { NotificationUsecase } from "../usecaseLayer/usecase/notificationUsecase";

export class NotificationController{
  
    private readonly notificationUsecase:NotificationUsecase;

    constructor(notificationUsecase:NotificationUsecase){
       this.notificationUsecase = notificationUsecase;
    }


    async getAllNotifications(req:Req,res:Res,next:Next){
        try{
       const getAllNotification=await this.notificationUsecase.getAllNotifications(req.params.userId)
       res.status(getAllNotification.status).json({
        success: getAllNotification.success,
        data:getAllNotification.data
       })
    }catch(err){
        next(err)
    }
    }

    async deleteAllNotifications(req:Req,res:Res,next:Next){
        try{
        const deleteAllNotification=await this.notificationUsecase.deleteAllNotification(req.params.userId)
       res.status(deleteAllNotification.status).json({
        success: deleteAllNotification.success,
        message:deleteAllNotification.message
       })
    }catch(err){
        next(err)
    }
    }

    async deleteOneNotifications(req:Req,res:Res,next:Next){
        try{
        const deleteOneNotification=await this.notificationUsecase.deleteOneNotification(req.params.id)
       res.status(deleteOneNotification.status).json({
        success: deleteOneNotification.success,
        message:deleteOneNotification.message
       })
    }catch(err){
        next(err)
    }
    }
}