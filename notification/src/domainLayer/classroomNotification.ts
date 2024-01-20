export interface IClassroomNotification{
    _id?:string
    user_id:string,
    classroom_id?:string,
    className?:string,
    reason?:string
    message:string,
    isRead:boolean
}