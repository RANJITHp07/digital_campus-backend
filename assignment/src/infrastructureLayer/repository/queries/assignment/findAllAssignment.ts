import { Model } from "mongoose";
import { IAssignmentModel } from "../../../model/assignment";

export const findAssignments = async (assignmentModel: Model<IAssignmentModel>, id: string): Promise<IAssignmentModel[]> => {
  try {
    const assignments = await assignmentModel.find({
      $and: [
        { dueDate: { $exists: true } },
        { students: id },
        { "dueDate.day": { $ne: null } },
        { "dueDate.time": { $ne: null } }
      ]
    }) as IAssignmentModel[];
    return assignments;
  } catch (err) {
    throw err;
  }
};
