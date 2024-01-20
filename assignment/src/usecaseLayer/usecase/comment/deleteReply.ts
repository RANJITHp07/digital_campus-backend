import { IReply } from "../../../domainLayer/comments";
import { Response } from "../../interface/Response";
import { ICommentRepository } from "../../interface/commentRepository";
import { IErrorHandler } from "../../interface/errorHandler";
import { IRequestValidator } from "../../interface/validateRepository";

export const deleteReply=async(commentRepository:ICommentRepository,requestValidator:IRequestValidator,errorHandler:IErrorHandler,id:string,reply:IReply):Promise<Response>=>{
    try{
      //validating parameters
      const validation = requestValidator.validateRequiredFields(
        {id,reply},
        ['id','reply']
    );

    if (!validation.success) {
        errorHandler.userInputError(validation.message as string)
    }
        const deletedReply=await commentRepository.deleteReply(id,reply)
        if(deletedReply){
          return {
            message:"Deleted  reply successfully"
          }
        }
        errorHandler.userInputError("No such comment")
    }catch(err){
      throw err
    }
   }