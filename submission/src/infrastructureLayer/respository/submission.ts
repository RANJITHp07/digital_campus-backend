// import { any } from "../../domainLayer/submission";
import submissionModel from "../model/submission";

export class SubmissionRepository{

    async create(submission:any):Promise<string>{
        try{
           await submissionModel.create(submission);
           return 'successfully submitted'
        }catch(err){
            throw err
        }
    }

    async update({id,update}:{id:string,update:Partial<any>}):Promise<boolean>{
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