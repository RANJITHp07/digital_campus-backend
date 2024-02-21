import { Model, Types } from "mongoose"
import { ISubmissionModel } from "../../../model/submission"
import { redis } from "../../../config/redis"

export const findSubmission=async(submissionModel:Model<ISubmissionModel>,id:Types.ObjectId,userId:string):Promise<ISubmissionModel | null>=>{
    try{
        const cachedSubmission=await redis.get(`${id.toString()}:${userId}`)
        if(cachedSubmission){
             return JSON.parse(cachedSubmission)
        }
        const submission=await submissionModel.findOne({assignment:id,user_id:userId}).populate('assignment')
        if(submission){
            await redis.set(`${id.toString()}:${userId}`,JSON.stringify(submission))
            await redis.expire(`${id.toString()}:${userId}`,3600)
        }
        return submission
    }catch(err){
     throw err
    }
 }