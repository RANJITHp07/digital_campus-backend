import { Model, Types } from "mongoose";
import { IAssignmentModel } from "../../../model/assignment";

export const groupedAssignment = async (
  assignmentModel: Model<IAssignmentModel>,
  id: Types.ObjectId
): Promise<Array<{ _id: string | null, assignments: IAssignmentModel[] }>> => {
  const assignment = await assignmentModel.aggregate([
    {
      $match: {
        class_id: { $in: [id.toString()] },
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $group: {
        _id: {
          $ifNull: ["$mainTopic", null],
        },
        assignments: { $push: "$$ROOT" },
      },
    },
    {
      $sort: {
        "_id": 1,
      },
    },
  ]);

  return assignment;
};
