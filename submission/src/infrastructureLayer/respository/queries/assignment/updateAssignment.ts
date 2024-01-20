import { Model, Types } from "mongoose"
import { IAssignment } from "../../../../domainLayer/assignment"
import { IAssignmentModel } from "../../../model/assignment"
import { redis } from "../../../config/redis"

export const updateAssignment=async(assignmentModel:Model<IAssignmentModel>,id:Types.ObjectId,update:Partial<IAssignment>):Promise<string | null>=>{
    try{
       const updateAssignment=await assignmentModel.findByIdAndUpdate(id,update)
       if(updateAssignment){
        await redis.set(id.toString()+'submission',JSON.stringify(updateAssignment));
        await redis.expire(id.toString(), 3600);
        return 'assignment successfully updated'
       }
       return null;
       
    }catch(err){
        throw err
    }
}
