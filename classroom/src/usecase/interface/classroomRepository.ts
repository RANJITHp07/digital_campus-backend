import { IClassroom } from "../../entities/classroom"

export interface  IClassroomReository{
    create(classroom:IClassroom):Promise<string>
    update(id:string,update:Partial<IClassroom>):Promise<string>
    delete(id:string):Promise<string>
    getClassroom(id:string):Promise<IClassroom | null>,
    getAllClassroom(code:string):Promise<IClassroom[] | null>
    getCreatorClassrooms(id:string):Promise<IClassroom[]>
}