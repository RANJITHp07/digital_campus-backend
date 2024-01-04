import { ErrorHandler } from "../infrastructureLayer/middleware/error/userErrorhandler";
import { IComment, IReply } from "../domainLayer/comments";
import { Commentusecase } from "../usecaseLayer/usecase/commentusecase";

export class CommentAdapter{
    private readonly commentUsecase:Commentusecase;

    constructor(commentUsecase:Commentusecase) {
          this.commentUsecase = commentUsecase
    }

    async createComment(_:unknown,args:{comment:IComment}){
        try{
           const newComment=await this.commentUsecase.createComment(args)
           return newComment
        }catch(err){
           throw err
        }
    }

    async deleteComment(_:unknown,args:{id:string}){
        try{
             const deletedComment=await this.commentUsecase.deleteComment(args)
             return deletedComment
        }catch(err){
           throw err
        }
    }

    async getAllComments(_:unknown,args:{id:string}){
        try{
            const comments=await this.commentUsecase.getAllComments(args);
            return comments
        }catch(err){
           throw err
        }
    }

    async deleteReply(_:unknown,args:{id:string,reply:IReply}){
        try{
           const deletedReply=await this.commentUsecase.deleteReply(args);
           return deletedReply
        }catch(err){
            throw err
         }
    }

    async updateReply(_:unknown,args:{id:string,reply:IReply}){
        try{
           const updatedReply=await this.commentUsecase.updateReply(args);
           return updatedReply
        }catch(err){
            throw err
         }
    }
}
