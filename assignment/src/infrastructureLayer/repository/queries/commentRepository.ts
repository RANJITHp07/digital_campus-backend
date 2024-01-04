import { IComment, IReply } from "../../../domainLayer/comments"
import { ICommentRepository } from "../../../usecaseLayer/interface/commentRepository"
import CommentModel from "../../model/comment"

export class CommentRepository implements ICommentRepository{

    //to create the comments
    async create(comment:IComment):Promise<string>{
        try{
          await CommentModel.create(comment)
          return 'successfully created comment'
        }catch(err){
            throw err
        }
    }

    //to delete the comments
    async delete(id:string):Promise<boolean>{
        try{
           const deletedComment=await CommentModel.findByIdAndDelete(id)
           return deletedComment ?true :false
        }catch(err){
            throw err
        }
    }

    //to give reply to the comment
    async updateReply(id:string,reply:IReply):Promise<boolean>{
       try{
         const updatedReply=await CommentModel.findByIdAndUpdate(id,{$set:{$addToset:reply}})
         return updatedReply ? true :false
       }catch(err){
        throw err
       }
    }

    //to delete the reply
    async deleteReply(id:string,reply:IReply):Promise<boolean>{
       try{
        const deletedReply=await CommentModel.findByIdAndUpdate(id,{$set:{$pull:reply}})
        return deletedReply ? true :false
       }catch(err){
        throw err
       }
    }

    // to get the private and public reply seperately
    async  getMessagesByAssignmentId(assignmentId: string): Promise<{ publicMessages: IComment[], privateMessages: IComment[] }> {
        try {
          const allMessages = await CommentModel.find({ assignment_id: assignmentId });
      
          const publicMessages = allMessages.filter((message) => message.type === 'public');
          const privateMessages = allMessages.filter((message) => message.type === 'private');
      
          return { publicMessages, privateMessages };
        } catch (err) {
          throw err;
        }
      }
}
