import { Model, Types } from "mongoose"
import { ISubmissionModel } from "../../../model/submission"

export const findAllSubmission=async(submissionModel:Model<ISubmissionModel>,id:Types.ObjectId):Promise<ISubmissionModel[]>=>{
    try{
        const allSubmissions=await submissionModel.find({assignment:id}).populate('assignment')
        return allSubmissions
    }catch(err){
        throw err
    }
}