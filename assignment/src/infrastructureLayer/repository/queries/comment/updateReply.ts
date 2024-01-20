import { Model, Types } from "mongoose"
import { ICommentModel } from "../../../model/comment"
import { IReply } from "../../../../domainLayer/comments"

export const updateReply=async(commentModel: Model<ICommentModel>, id:Types.ObjectId,reply:IReply):Promise<boolean>=>{
    try{
      const updatedReply=await commentModel.findByIdAndUpdate(id,{$set:{$addToset:reply}})
      return updatedReply ? true :false
    }catch(err){
     throw err
    }
 }