import { IClassroomNotification } from "../../domainLayer/classroomNotification";

export interface IClassRoomNotificationRepository {
    create(notification: IClassroomNotification): Promise<string>;
    deleteAllNotifications(userId: string): Promise<string>;
    deleteOneNotification(id: string): Promise<boolean>;
    getAllNotification(userId: string): Promise<IClassroomNotification[]>;
}