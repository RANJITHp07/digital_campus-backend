import { IAssigment } from "../../domainLayer/assignment";

export interface IAssigmentRepository{
    create(assignment:IAssigment):Promise<unknown>
    getAllassignments(id:string):Promise<unknown[]>
    getOneAssignment(id:string):Promise<unknown | null>
    groupedAssignment(id: string):Promise<unknown>
    distinctTopic():Promise<string[]>
    deleteAssignment(id:string):Promise<unknown | null>
    update(id:string,update:Partial<IAssigment>):Promise<unknown | null>
    findAssignments(id: string):Promise<unknown[]> 
}