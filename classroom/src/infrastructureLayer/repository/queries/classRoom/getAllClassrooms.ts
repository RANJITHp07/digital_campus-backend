import { Model } from "mongoose";
import { IClassroomModel } from "../../../models/classroom";
import { IClassroom } from "../../../../domainLayer/classroom";

export const findAllUsersClassroom=async(classroomModel:Model<IClassroomModel>, page: number = 1, pageSize: number = 10):Promise<IClassroom[]> =>{
    try {
      const skipAmount = (page - 1) * pageSize;
  
      const classrooms = await classroomModel
        .find()
        .skip(skipAmount)
        .limit(pageSize);
  
      return classrooms;
    } catch (err) {
      throw err;
    }
  }