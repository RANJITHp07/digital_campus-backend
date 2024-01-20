import { Model, Types } from "mongoose";
import { IClassroomModel } from "../../../models/classroom";

export const updateProfile=async(classroomModel:Model<IClassroomModel>,id:Types.ObjectId, update: { profile: string }):Promise<string>=> {
    try {
      const result = await classroomModel.updateOne(
        {
          "admins.0": id,
        },
        {
          $set: update,
        }
      );
      if (result) return "updated profile";
      return "not updated profile";
    } catch (err) {
      throw err;
    }
  }