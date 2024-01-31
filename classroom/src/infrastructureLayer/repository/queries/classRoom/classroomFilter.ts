import { Model, Types } from "mongoose";
import { IClassroom } from "../../../../domainLayer/classroom";
import { IClassroomModel } from "../../../models/classroom";

export const  classroomFilter=async(classroomModel:Model<IClassroomModel>,id:string, category: string[]):Promise<IClassroom[]>=>{
    try {
      const classrooms = await classroomModel.find({
        $and: [
          { $or: [{ students_enrolled: id }, { admins: id }] },
          { category: { $in: category } },
        ],
      });
      return classrooms;
    } catch (err) {
      throw err;
    }
  }