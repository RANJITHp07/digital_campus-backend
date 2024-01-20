import { Model, Types } from "mongoose";
import { IAssignmentModel } from "../../../model/assignment";

export const distinctTopic = async (
  assignmentModel: Model<IAssignmentModel>,
  id: Types.ObjectId
): Promise<string[]> => {
  try {
    const distinctMainTopics = await assignmentModel.distinct('mainTopic', { class_id: id.toString() });
    return distinctMainTopics;
  } catch (err) {
    throw err;
  }
};
