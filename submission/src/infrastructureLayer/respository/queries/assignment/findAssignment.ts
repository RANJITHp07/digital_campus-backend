import { Model, Types } from "mongoose"
import { IAssignmentModel } from "../../../model/assignment"
import { redis } from "../../../config/redis"

export const findAssignment=async(assignmentModel:Model<IAssignmentModel>,id:Types.ObjectId):Promise<IAssignmentModel | null>=>{
    try{
        const cachedAssignment = await redis.get(id.toString()+'submission');
        if(cachedAssignment){
            return JSON.parse(cachedAssignment)
        }
       const assignment= await assignmentModel.findById(id)
       if(assignment){
         await redis.set(id.toString()+'submission',JSON.stringify(assignment));
         await redis.expire(id.toString(), 3600);
       }
       return assignment
    }catch(err){
        throw err
    }
}