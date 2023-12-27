import { IClassroom } from "../../domainLayer/classroom"

export interface  IClassroomReository{
    create(classroom:IClassroom):Promise< IClassroom>
    update(id:string,update:Partial<IClassroom>):Promise<boolean>
    delete(id:string):Promise<boolean>
    getClassroom(id:string):Promise<IClassroom | null>,
    getAllClassroom(code:string):Promise<IClassroom[] | null>
    getCreatorClassrooms(id:string):Promise<IClassroom[]>
}