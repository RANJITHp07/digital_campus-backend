import { IAssignment } from "../../domainLayer/assignment"

export interface IAssignmentRepository{
    create(assignment:any):Promise<string>
    update(id:string,update:Partial<IAssignment>):Promise<string | null>
    findAssignment(id:string):Promise<unknown | null>
}