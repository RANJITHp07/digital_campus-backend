import { Model, Types } from "mongoose"
import { ISubmission } from "../../../../domainLayer/submission"
import { ISubmissionModel } from "../../../model/submission"

export const updateSubmission=async(submissionModel:Model<ISubmissionModel>,id:Types.ObjectId,update:Partial<ISubmission>):Promise<boolean>=>{
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