import { Model, Types } from "mongoose"
import { ICommentModel } from "../../../model/comment"
import { redis } from "../../../config/redis";

export const deleteComment=async(commentModel:Model<ICommentModel> ,id:Types.ObjectId):Promise<boolean>=>{
    try{
       const deletedComment=await commentModel.findByIdAndDelete(id);
       if(deletedComment){
        const cachedComments=JSON.parse(await redis.get(deletedComment.assignment_id+'comment') as string)
        if(cachedComments){
            const indexToDelete = cachedComments.findIndex((comment: ICommentModel) => comment._id.toString() === id.toString());
            if (indexToDelete !== -1) {
                cachedComments.splice(indexToDelete, 1);
                await redis.set(deletedComment.assignment_id+'comment',JSON.stringify(cachedComments));
            }  
        }
        return true
       }
       return false
    }catch(err){
        throw err
    }
}