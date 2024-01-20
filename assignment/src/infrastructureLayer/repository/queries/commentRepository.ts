import { Model, Types } from "mongoose"
import { IComment, IReply } from "../../../domainLayer/comments"
import { ICommentRepository } from "../../../usecaseLayer/interface/commentRepository"
import CommentModel, { ICommentModel } from "../../model/comment"
import  {createComment,deleteComment, deleteReply, getComments, updateReply} from './comment/index'

export class CommentRepository implements ICommentRepository{

   constructor(private readonly commentModel:Model<ICommentModel>){}

    //to create the comments
    async create(comment:IComment):Promise<string>{
        return createComment(this.commentModel,comment);
    }

    //to delete the comments
    async delete(id:string):Promise<boolean>{
      return deleteComment(this.commentModel,new Types.ObjectId(id))
    }

    //to give reply to the comment
    async updateReply(id:string,reply:IReply):Promise<boolean>{
       return updateReply(this.commentModel,new Types.ObjectId(id),reply)
    }

    //to delete the reply
    async deleteReply(id:string,reply:IReply):Promise<boolean>{
       return deleteReply(this.commentModel,new Types.ObjectId(id),reply)
    }

    // to get the private and public reply seperately
    async  getComments(assignmentId: string): Promise<{ publicMessages: IComment[], privateMessages: IComment[] }> {
        return getComments(this.commentModel,new Types.ObjectId(assignmentId));
      }
}
