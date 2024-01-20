import { IClassroomNotification } from "../../domainLayer/classroomNotification";
import { IClassRoomNotificationRepository } from "../interface/IClassroomNotification";
import {
    deleteAllNotification,
    deleteOneNotification,
    getAllNotification,
  } from './notification/index'

export class NotificationUsecase{

     private readonly notificationRepository: IClassRoomNotificationRepository;

    constructor(notificationRepository:IClassRoomNotificationRepository){
        this.notificationRepository = notificationRepository;
    } 

    async getAllNotifications(userId:string){
         return getAllNotification(this.notificationRepository,userId);
    } 

    async deleteOneNotification(id:string){
         return deleteOneNotification(this.notificationRepository,id);
    }

    async deleteAllNotification(userId:string){
       return deleteAllNotification(this.notificationRepository,userId);
    }

}