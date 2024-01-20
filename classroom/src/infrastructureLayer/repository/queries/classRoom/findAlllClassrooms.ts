import { Model } from "mongoose";
import { IClassroom } from "../../../../domainLayer/classroom";
import { IClassroomModel } from "../../../models/classroom";

export const findAllClassrooms=async(classroomModel:Model<IClassroomModel>,studentId: string): Promise<IClassroom[]>=>{
    try {
     let classrooms = await classroomModel.find({ students_enrolled: { $in: [studentId] } });
      return classrooms;
    } catch (err) {
      throw err;
    }
}