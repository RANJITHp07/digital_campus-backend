import { NotificationController } from "../../../adapterLayer/notificationController";
import { NotificationUsecase } from "../../../usecaseLayer/usecase/notificationUsecase";
import ClassroomNotificationModel from "../../model/classRoomNotification";
import { ClassRoomNotificationRepository } from "../../repository/queries/notification";


const repository=new ClassRoomNotificationRepository(ClassroomNotificationModel);
const usecase=new NotificationUsecase(repository);
const controller=new NotificationController(usecase);

export default controller