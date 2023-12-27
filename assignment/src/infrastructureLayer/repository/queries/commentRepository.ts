import { IComment } from "../../../domainLayer/comments"
import CommentModel from "../../model/comment"

export class CommentRepository{
    async create(comment:IComment){
        try{
          await CommentModel.create(comment)
          return 'successfully created comment'
        }catch(err){
            throw err
        }
    }

    async delete(id:string){
        try{
           const deletedComment=await CommentModel.findByIdAndDelete(id)
           return deletedComment ?true :false
        }catch(err){
            throw err
        }
    }

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
