import { Model, Types } from "mongoose";
import { redis } from "../../../config/redis";
import { IClassroomModel } from "../../../models/classroom";

export const deleteClassroom=async(classroomModel:Model<IClassroomModel>,id: Types.ObjectId ): Promise<boolean>=>{
    try {
      const deletedDocument = await classroomModel.findByIdAndDelete(id);
      if (!deletedDocument) {
        return false;
      }
      await redis.del(id.toString());
      return true;
    } catch (err) {
      throw err;
    }
  }