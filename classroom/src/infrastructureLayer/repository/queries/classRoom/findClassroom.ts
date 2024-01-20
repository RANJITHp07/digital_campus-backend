import { Model } from "mongoose";
import { IClassroom } from "../../../../domainLayer/classroom";
import { IClassroomModel } from "../../../models/classroom";
import { redis } from "../../../config/redis";

export const findClassroom=async(classroomModel:Model<IClassroomModel>,code: string): Promise<IClassroom | null>=>{
    try {
        const cachedClassroom= await redis.get(code)
        if(cachedClassroom){
           return JSON.parse(cachedClassroom)
        }
      let classroom = await classroomModel.findOne({ classCode: code });
      return classroom || null;
    } catch (err) {
      throw err;
    }
  }
