import { IComment, IReply } from "../../domainLayer/comments";
import { ErrorHandler } from "../../infrastructureLayer/middleware/error/userErrorhandler";
import { CommentRepository } from "../../infrastructureLayer/repository/queries/commentRepository";
import RequestValidator from "../../infrastructureLayer/repository/service/validatorRepository";

export class Commentusecase{
   private readonly commentRepository:CommentRepository
   private readonly errorHandler:ErrorHandler
   private readonly requestValidator:RequestValidator

   constructor(commentRepository:CommentRepository,errorHandler:ErrorHandler,requestValidator:RequestValidator){
     this.commentRepository = commentRepository;
     this.errorHandler = errorHandler;
     this.requestValidator=requestValidator;
   }

   async createComment({comment}:{comment:IComment}){
       try{
         const newComment = await this.commentRepository.create(comment)
         return {
            message: newComment
         }
       }catch(err){
       throw err
       }
   }

   async deleteComment({id}:{id:string}){
     try{
      //validating parameters
      const validation = this.requestValidator.validateRequiredFields(
        {id},
        ['id']
    );

    if (!validation.success) {
        this.errorHandler.userInputerror(validation.message as string)
    }

       const deletedComment=await this.commentRepository.delete(id);
       if(deletedComment){
         return {
            message:'deleted successfully'
         }
       }
       this.errorHandler.userInputerror("No such comment to delete")
     }catch(err){
       throw err
     }
   }

   async getAllComments({id}:{id:string}){
    try{
      //validating parameters
      const validation = this.requestValidator.validateRequiredFields(
        {id},
        ['id']
    );

    if (!validation.success) {
        this.errorHandler.userInputerror(validation.message as string)
    }
         const comments=await this.commentRepository.getMessagesByAssignmentId(id)
         return comments
    }catch(err){
       throw err
    }
   }

   async deleteReply({id,reply}:{id:string,reply:IReply}){
    try{
      //validating parameters
      const validation = this.requestValidator.validateRequiredFields(
        {id,reply},
        ['id','reply']
    );

    if (!validation.success) {
        this.errorHandler.userInputerror(validation.message as string)
    }
        const deletedReply=await this.commentRepository.deleteReply(id,reply)
        if(deletedReply){
          return {
            message:"Deleted  reply successfully"
          }
        }
        this.errorHandler.userInputerror("No such comment")
    }catch(err){
      throw err
    }
   }


   async updateReply({id,reply}:{id:string,reply:IReply}){
    try{
       //validating parameters
      const validation = this.requestValidator.validateRequiredFields(
        {id,reply},
        ['id','reply']
    );

    if (!validation.success) {
        this.errorHandler.userInputerror(validation.message as string)
    }
        const updatedReply=await this.commentRepository.deleteReply(id,reply)
        if(updatedReply){
          return {
            message:"Added reply successfully"
          }
        }
        this.errorHandler.userInputerror("No such comment")
    }catch(err){
      throw err
    }
   }
 
}