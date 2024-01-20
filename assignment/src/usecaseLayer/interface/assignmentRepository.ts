import { IAssignment } from "../../domainLayer/assignment";

export interface IAssigmentRepository{
    create(assignment:IAssignment):Promise<unknown>
    getAllassignments(id:string):Promise<unknown[]>
    getOneAssignment(id:string):Promise<unknown | null>
    groupedAssignment(id: string): Promise<Array<{ _id: string | null, assignments: unknown[] }>>
    distinctTopic(id:string):Promise<string[]>
    deleteAssignment(id:string):Promise<unknown | null>
    update(id:string,update:Partial<IAssignment>):Promise<unknown | null>
    findAssignments(id: string):Promise<unknown[]> 
}