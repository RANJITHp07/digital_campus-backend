import { Model, Types } from "mongoose"
import { IReply } from "../../../../domainLayer/comments"
import { ICommentModel } from "../../../model/comment"

export const deleteReply=async(commentModel:Model<ICommentModel>,id:Types.ObjectId,reply:IReply):Promise<boolean>=>{
    try{
     const deletedReply=await commentModel.findByIdAndUpdate(id,{$set:{$pull:reply}})
     return deletedReply ? true :false
    }catch(err){
     throw err
    }
 }