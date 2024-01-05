import { ISubmission } from "../../domainLayer/submission";

export interface ISubmissionRepository{

    create(submission:ISubmission):Promise<string>
    update({id,update}:{id:string,update:any}):Promise<boolean>
}