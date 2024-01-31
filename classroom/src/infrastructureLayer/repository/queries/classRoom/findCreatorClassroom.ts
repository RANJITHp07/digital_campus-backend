import { Model, Types } from "mongoose";
import { IClassroom } from "../../../../domainLayer/classroom";
import { IClassroomModel } from "../../../models/classroom";

export const getCreatorClassrooms=async(classroomModel:Model<IClassroomModel>,id: string): Promise<IClassroom[]>=>{
    try {
      const classrooms: IClassroom[] = await classroomModel.aggregate([
        {
          $match: {
            $expr: { $eq: [{ $arrayElemAt: ["$admins", 0] }, id] }, // to comapre the 0th index id and argument id to find who created the class.Because the first element in the array will be the person who created the classroom
          },
        },
      ]);
      return classrooms;
    } catch (err) {
      throw err;
    }
  }