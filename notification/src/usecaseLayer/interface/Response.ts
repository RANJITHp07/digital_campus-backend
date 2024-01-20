import { IClassroomNotification } from "../../domainLayer/classroomNotification";

export interface Response{
  status: number;
  success: boolean;
  message?: string;
  data?: IClassroomNotification[];
}
