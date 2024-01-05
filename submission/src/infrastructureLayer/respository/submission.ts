import { ISubmission } from "../../domainLayer/submission";
import { ISubmissionRepository } from "../../usecaseLayer/interface/submission";
import submissionModel from "../model/submission";

export class SubmissionRepository implements ISubmissionRepository{

    async create(submission:ISubmission):Promise<string>{
        try{
           await submissionModel.create(submission);
           return 'successfully submitted'
        }catch(err){
            throw err
        }
    }

    async update({id,update}:{id:string,update:Partial<ISubmission>}):Promise<boolean>{
        try{
           const updatedSubmission=await submissionModel.findByIdAndUpdate(id,{$set:update})
           if(updatedSubmission){
            return true
           }
           return false
        }catch(err){
            throw err
        }
    }
}