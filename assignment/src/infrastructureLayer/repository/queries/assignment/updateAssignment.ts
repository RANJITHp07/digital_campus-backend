import { Model, Types } from "mongoose";
import { IAssignmentModel } from "../../../model/assignment";
import { IAssignment } from "../../../../domainLayer/assignment";
import { redis } from "../../../config/redis";

export const updateAssignment=async( assignmentModel: Model<IAssignmentModel>,
    id: Types.ObjectId,update:Partial<IAssignment>):Promise<IAssignmentModel | null>=>{
    try{
      const updateAssignment=await assignmentModel.findByIdAndUpdate(id,{$set:update},{ new: true })as IAssignmentModel
      if (updateAssignment && updateAssignment instanceof assignmentModel) {
        //caching the updated assignment
        await redis.set(id.toString(),JSON.stringify(updateAssignment))
        await redis.expire(id.toString(), 3600);

        return updateAssignment as IAssignmentModel;
      } else {
        return null;
      }
   }catch(err){
     throw err
   }
  }