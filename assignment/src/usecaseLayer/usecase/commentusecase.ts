import { IComment } from "../../domainLayer/comments";
import { ErrorHandler } from "../../infrastructureLayer/middleware/error/userErrorhandler";
import { CommentRepository } from "../../infrastructureLayer/repository/queries/commentRepository";

export class Commentusecase{
   private readonly commentRepository:CommentRepository
   private readonly errorHandler:ErrorHandler

   constructor(commentRepository:CommentRepository,errorHandler:ErrorHandler){
     this.commentRepository = commentRepository;
     this.errorHandler = errorHandler;
   }

   async createComment(comment:IComment){
       try{
         const newComment = await this.commentRepository.create(comment)
         return {
            message: newComment
         }
       }catch(err){
        this.errorHandler.apolloError(err)
       }
   }

   async deleteComment(id:string){
     try{
       const deletedComment=await this.commentRepository.delete(id);
       if(deletedComment){
         return {
            message:'deleted successfully'
         }
       }
       this.errorHandler.userInputerror("No such comment to delete")
     }catch(err){
        this.errorHandler.apolloError(err)
     }
   }

   async getAllComments(id:string){
    try{
         const comments=await this.commentRepository.getMessagesByAssignmentId(id)
         return comments
    }catch(err){
        this.errorHandler.apolloError(err)
    }
   }
 
}