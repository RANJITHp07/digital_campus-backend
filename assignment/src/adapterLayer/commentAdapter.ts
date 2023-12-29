import { ErrorHandler } from "../infrastructureLayer/middleware/error/userErrorhandler";
import { IComment } from "../domainLayer/comments";
import { Commentusecase } from "../usecaseLayer/usecase/commentusecase";

export class CommentAdapter{
    private readonly commentUsecase:Commentusecase;
    private errorHandler:ErrorHandler

    constructor(commentUsecase:Commentusecase,errorHandler:ErrorHandler) {
          this.commentUsecase = commentUsecase,
          this.errorHandler=errorHandler
    }

    async createComment(_:unknown,args:{comment:IComment}){
        try{
           const newComment=await this.commentUsecase.createComment(args.comment)
           return newComment
        }catch(err){
            this.errorHandler.apolloError(err)
        }
    }

    async deleteComment(_:unknown,args:{id:string}){
        try{
             const deletedComment=await this.commentUsecase.deleteComment(args.id)
             return deletedComment
        }catch(err){
            this.errorHandler.apolloError(err)
        }
    }

    async getAllComments(_:unknown,args:{id:string}){
        try{
            const comments=await this.commentUsecase.getAllComments(args.id);
            return comments
        }catch(err){
            this.errorHandler.apolloError(err)
        }
    }
}
