import { Model, Types } from "mongoose";
import { IClassroomModel } from "../../../models/classroom";
import { IClassroom } from "../../../../domainLayer/classroom";

export const getAllTheClassroom=async(classroomModel:Model<IClassroomModel>,id:Types.ObjectId):Promise<IClassroom[]>=>{
    try {
      const classroom = await classroomModel.find({
        $or: [{ admins: id }, { students_enrolled: id }],
      });

      return classroom;
    } catch (err) {
      throw err;
    }
  }