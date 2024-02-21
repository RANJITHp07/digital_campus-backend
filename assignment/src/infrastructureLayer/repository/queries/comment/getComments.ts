import { Model, Types } from "mongoose";
import { IComment } from "../../../../domainLayer/comments";
import { ICommentModel } from "../../../model/comment";
import { redis } from "../../../config/redis";

export const getComments=async(commentModel: Model<ICommentModel>,assignmentId:Types.ObjectId): Promise<{ publicMessages: IComment[], privateMessages: IComment[] }>=>{
    try {
      const cachedComments=JSON.parse(await redis.get(assignmentId.toString()+'comment') as string)
      if(cachedComments!=null && cachedComments.length>0){
        const publicMessages = cachedComments.filter((message:IComment) => message.type === 'public');
      const privateMessages = cachedComments.filter((message:IComment) => message.type === 'private');
  
      return { publicMessages, privateMessages };
      }

      const allMessages = await commentModel.find({ assignment_id: assignmentId });
      const publicMessages = allMessages.filter((message:IComment) => message.type === 'public');
      const privateMessages = allMessages.filter((message:IComment) => message.type === 'private');

      redis.set(assignmentId.toString()+'comment',JSON.stringify(allMessages))
  
      return { publicMessages, privateMessages };
    } catch (err) {
      throw err;
    }
  }