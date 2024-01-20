import { Model } from "mongoose";
import { ISubmission } from "../../../../domainLayer/submission";
import { ISubmissionModel } from "../../../model/submission";

export const createSubmission=async(submissionModel:Model<ISubmissionModel>,submission:ISubmission):Promise<string>=>{
    try{
       await submissionModel.create(submission);
       return 'successfully submitted'
    }catch(err){
 
        throw err
    }
}
