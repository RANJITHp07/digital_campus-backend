import { Model, Types } from "mongoose"
import { IAssignmentModel } from "../../../model/assignment"
import { redis } from "../../../config/redis"

export const  deleteAssignment=async(assignmentModel:Model<IAssignmentModel>,id:Types.ObjectId):Promise<string | null>=>{
    try{
        const deleteAssignment=await assignmentModel.findByIdAndDelete(id)
        if(deleteAssignment){
            await redis.del(id.toString()+'submission')
            return 'assignment deleted'
        }
        return  null
    }catch(err){
        throw err
    }
}