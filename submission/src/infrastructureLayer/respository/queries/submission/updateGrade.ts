import { Model, Types } from "mongoose";
import { ISubmissionModel } from "../../../model/submission";

export const updateGrade=async(submissionModel:Model<ISubmissionModel>,assignmentId:Types.ObjectId, userId: string, newGrade: number):Promise<boolean> => {
    try {
      const filter = { assignment: assignmentId, user_id: userId };
      const update = { 'submission.grade': newGrade };
  
      
      const result = await submissionModel.findOneAndUpdate(filter, {$set:update});
      if (result) {
        return true
      }
      return false
    } catch (err) {
      throw err
    }
  };