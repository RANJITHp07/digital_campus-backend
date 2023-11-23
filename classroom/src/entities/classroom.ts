// complete details of the classroom going to be created
export interface IClassroom{
    _id?:number,
    className:string,
    classSection:string,
    classSubject:string,
    creator:string,
    students_enrolled:string[],
    admins:[string],
    classCode:string,
    backgroundPicture:string,
    createdAt?:Date
}
