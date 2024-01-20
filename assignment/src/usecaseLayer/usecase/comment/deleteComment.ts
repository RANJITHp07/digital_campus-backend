import { Response } from "../../interface/Response";
import { ICommentRepository } from "../../interface/commentRepository";
import { IErrorHandler } from "../../interface/errorHandler";
import { IRequestValidator } from "../../interface/validateRepository";

export const deleteComment=async( commentRepository:ICommentRepository,requestValidator:IRequestValidator,errorHandler:IErrorHandler,id:string):Promise<Response>=>{
    try{
     //validating parameters
     const validation = requestValidator.validateRequiredFields(
       {id},
       ['id']
   );

   if (!validation.success) {
       errorHandler.userInputError(validation.message as string)
   }

      const deletedComment=await commentRepository.delete(id);
      if(deletedComment){
        return {
           message:'deleted successfully'
        }
      }
      errorHandler.userInputError("No such comment to delete")
    }catch(err){
      throw err
    }
  }