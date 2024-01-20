import { Model, Types } from "mongoose";
import { IClassroom } from "../../../../domainLayer/classroom";
import { redis } from "../../../config/redis";
import { IClassroomModel } from "../../../models/classroom";

export const findAllparticipants=async(classroomModel:Model<IClassroomModel>,id: Types.ObjectId): Promise<IClassroom | null>=>{
    try {
      const cachedClassroom = await redis.get(id.toString());
      if (cachedClassroom) {
        return JSON.parse(cachedClassroom);
      }
      const classroom = await classroomModel.findById(id);
      await redis.set(id.toString(), JSON.stringify(classroom));
      return classroom;
    } catch (err) {
      throw err;
    }
  }