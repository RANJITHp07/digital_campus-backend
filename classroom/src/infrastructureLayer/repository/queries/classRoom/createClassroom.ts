import { Model } from "mongoose";
import { IClassroom } from "../../../../domainLayer/classroom";
import { redis } from "../../../config/redis";
import { IClassroomModel } from "../../../models/classroom";

export const createClassroom=async(classroomModel:Model<IClassroomModel>,classroom: IClassroom): Promise<IClassroom>=>{
    try {
      const classRoom = await classroomModel.create({
        ...classroom,
        students_enrolled: [],
      });
      await redis.set(classRoom._id, JSON.stringify(classRoom));
      await redis.expire(classRoom._id, 3600);
      return classRoom;
    } catch (err) {
      throw err;
    }
  }