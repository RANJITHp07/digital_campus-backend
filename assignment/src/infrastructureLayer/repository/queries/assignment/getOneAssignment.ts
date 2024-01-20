import { Model, Types } from "mongoose";
import { redis } from "../../../config/redis";
import { IAssignmentModel } from "../../../model/assignment";

export const getOneAssignment = async (assignmentModel: Model<IAssignmentModel>, id:Types.ObjectId): Promise<IAssignmentModel | null> => {
    try {
        const cachedAssignment = await redis.get(id.toString());
        if (cachedAssignment) {
            return JSON.parse(cachedAssignment);
        }
       
        const assignment = await assignmentModel.findById(id) as IAssignmentModel | null;
        if (assignment) {
            await redis.set(id.toString(), JSON.stringify(assignment));
            await redis.expire(id.toString(), 3600);
        }
        return assignment;
    } catch (err) {
        throw err;
    }
};
