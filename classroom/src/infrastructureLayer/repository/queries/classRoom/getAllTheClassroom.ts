import { Model, Types } from "mongoose";
import { IClassroomModel } from "../../../models/classroom";
import { IClassroom } from "../../../../domainLayer/classroom";

export const getAllTheClassroom=async(classroomModel:Model<IClassroomModel>,id:string):Promise<IClassroom[]>=>{
    try {
      console.log(id)
      const classroom = await classroomModel.find({
        $or: [{ admins: id }, { students_enrolled: id }],
      });
    
      return classroom;
    } catch (err) {
      throw err;
    }
  }