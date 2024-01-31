import { Model } from "mongoose";
import { IClassroomModel } from "../../../models/classroom";
import { IClassroom } from "../../../../domainLayer/classroom";

export const findSearchedClassroom=async(classroomModel:Model<IClassroomModel>,page: number = 1, pageSize: number = 10, searchQuery: string):Promise<IClassroom[]>=> {
    try {
      const skipAmount = (page - 1) * pageSize;
      const searchCondition = searchQuery ? {
        $or: [
            { className: { $regex: new RegExp(searchQuery, 'i') } },
            { classCode: { $regex: new RegExp(searchQuery, 'i') } }
        ]
    } : {};
  
      const classrooms = await classroomModel
        .find(searchCondition)
        .skip(skipAmount)
        .limit(pageSize);

  
      return classrooms;
    } catch (err) {
      throw err;
    }
  }