import { Model } from "mongoose";
import { IClassroomNotificationModel } from "../../model/classRoomNotification";
import { IClassroomNotification } from "../../../domainLayer/classroomNotification";
import {
    createNotification,
    getAllNotifications,
    deleteNotification,
    deleteOneNotification,
  } from './notification/index'
import { IClassRoomNotificationRepository } from "../../../usecaseLayer/interface/IClassroomNotification";


export class ClassRoomNotificationRepository implements IClassRoomNotificationRepository{

    constructor(private readonly classRoomNotificationModel:Model<IClassroomNotificationModel>){}

    //to create notification
    async create(notification:IClassroomNotification):Promise<string>{
        return createNotification(this.classRoomNotificationModel,notification);
    } 

    //to remove all the read notification
    async deleteAllNotifications(userId:string):Promise<string>{
       return deleteNotification(this.classRoomNotificationModel,userId);
    }

    //to remove a particular read notification
    async deleteOneNotification(id:string):Promise<boolean>{
       return deleteOneNotification(this.classRoomNotificationModel,id)
    }

    //to getAll the notification together
    async getAllNotification(userId:string):Promise<IClassroomNotification[]>{
        return getAllNotifications(this.classRoomNotificationModel,userId)
    }


}