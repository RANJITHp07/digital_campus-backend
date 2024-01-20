import { Model } from "mongoose";
import { ICommentModel } from "../../../model/comment";
import { IComment } from "../../../../domainLayer/comments";

export const createComment = async (commentModel: Model<ICommentModel>, comment: IComment): Promise<string> => {
    try {
        const createdComment = await commentModel.create(comment);
        return 'Successfully created comment';
    } catch (err) {
        throw err;
    }
};
