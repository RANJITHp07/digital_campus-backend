import { Model } from "mongoose";
import { IClassroomModel } from "../../../models/classroom";
import { IClassroom } from "../../../../domainLayer/classroom";

export const  getReportedClassrooms=async(classroomModel:Model<IClassroomModel>,page: number = 1, pageSize: number = 10):Promise<IClassroom[]> => {
    try {
      const skipAmount = (page - 1) * pageSize;
  
      const reportedClassrooms = await classroomModel
        .find({
          reported: true,
          $or: [
            { blockClassroom: { $exists: false } },
            { blockClassroom: false },
          ],
        })
        .sort({ _id: -1 })
        .skip(skipAmount)
        .limit(pageSize);
  
      return reportedClassrooms;
    } catch (error) {
      throw error;
    }
  }
  