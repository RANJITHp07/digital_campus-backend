import { Model, Types } from "mongoose";
import { IAssignmentModel } from "../../../model/assignment"

export const getAllassignments = async ( assignmentModel:Model<IAssignmentModel>,id: Types.ObjectId): Promise<IAssignmentModel[]> => {
    try {
        const assignments = await assignmentModel.find({ class_id: id }).sort({ createdAt: -1 }) as IAssignmentModel[];
        return assignments;
    } catch (err) {
        throw err;
    }
};
