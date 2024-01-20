import { ISubmission } from "../../domainLayer/submission";

export interface ISubmissionRepository{

    create(submission:ISubmission):Promise<string>
    update({id,update}:{id:string,update:any}):Promise<boolean>
    find(id:string,userId:string):Promise<unknown | null>
    findAll(id:string):Promise<unknown[]>
    updateGrade(assignmentId: string, userId: string, newGrade: number):Promise<boolean>
}