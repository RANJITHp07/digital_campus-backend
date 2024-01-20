import { Model } from "mongoose";
import { IAssignment } from "../../../../domainLayer/assignment";
import { IAssignmentModel } from "../../../model/assignment";

export const createAssignment = async (
    assignmentModel: Model<IAssignmentModel>,
    assignment: IAssignment
): Promise<IAssignmentModel> => {
    try {
        const newAssignment = await assignmentModel.create(assignment) as IAssignmentModel;
        return newAssignment;
    } catch (err) {
        throw err;
    }
};
