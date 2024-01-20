import { Model,Types } from "mongoose";
import { IClassroom } from "../../../../domainLayer/classroom";
import { redis } from "../../../config/redis";
import { IClassroomModel } from "../../../models/classroom";

export const updateClassroom=async(classroomModel:Model<IClassroomModel>,id:Types.ObjectId, update: Partial<IClassroom>): Promise<boolean>=>{
    try {
      const updatedDocument = await classroomModel.findByIdAndUpdate(
        id,
        { $set: update },
        { new: true }
      );

      if (!updatedDocument) {
        return false;
      }
      await redis.set(id.toString(), JSON.stringify(updatedDocument));
      return true;
    } catch (err) {
      throw err;
    }
  }