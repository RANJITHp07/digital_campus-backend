import { IComment, IReply } from "../../domainLayer/comments";
import { ErrorHandler } from "../../infrastructureLayer/middleware/error/userErrorhandler";
import { CommentRepository } from "../../infrastructureLayer/repository/queries/commentRepository";
import RequestValidator from "../../infrastructureLayer/repository/service/validatorRepository";
import { createComment, deleteComment, deleteReply, getAllComments, updateReply } from "./comment/index";

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
       return createComment(this.commentRepository,comment)
   }

   async deleteComment({id}:{id:string}){
     return deleteComment(this.commentRepository,this.requestValidator,this.errorHandler,id)
   }

   async getAllComments({id}:{id:string}){
     return getAllComments(this.commentRepository,this.requestValidator,this.errorHandler,id)
   }

   async deleteReply({id,reply}:{id:string,reply:IReply}){
    return deleteReply(this.commentRepository,this.requestValidator,this.errorHandler,id,reply)
   }


   async updateReply({id,reply}:{id:string,reply:IReply}){
    return updateReply(this.commentRepository,this.requestValidator,this.errorHandler,id,reply)
   }
 
}