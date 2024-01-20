import { Model, Types } from "mongoose";
import { IAssignmentModel } from "../../../model/assignment";
import { redis } from "../../../config/redis";

export const deleteAssignment = async (
  assignmentModel: Model<IAssignmentModel>,
  id: Types.ObjectId
): Promise<IAssignmentModel | null> => {
  try {
    const deletedAssignment = await assignmentModel.findByIdAndDelete(id);
    if (deletedAssignment instanceof assignmentModel && deletedAssignment !== null) {

      // Deleting the cached assignment
      redis.del(deletedAssignment._id);
      return deletedAssignment as IAssignmentModel;
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};
