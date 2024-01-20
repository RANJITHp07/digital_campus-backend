import { IAssignment } from "../../domainLayer/assignment"

export interface IAssignmentRepository{
    create(assignment:IAssignment):Promise<string>
    update(id:string,update:Partial<IAssignment>):Promise<string | null>
    delete(id:string):Promise<string | null>
    findAssignment(id:string):Promise<unknown | null>
}