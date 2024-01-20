import { IComment } from "../../../domainLayer/comments";
import { ICommentRepository } from "../../interface/commentRepository";
import { IErrorHandler } from "../../interface/errorHandler";
import { IRequestValidator } from "../../interface/validateRepository";

export const getAllComments=async(commentRepository:ICommentRepository,requestValidator:IRequestValidator,errorHandler:IErrorHandler,id:string):Promise< {
    publicMessages: IComment[];
    privateMessages: IComment[];
}>=>{
    try{
      //validating parameters
      const validation = requestValidator.validateRequiredFields(
        {id},
        ['id']
    );

    if (!validation.success) {
        errorHandler.userInputError(validation.message as string)
    }
         const comments=await commentRepository.getComments(id)
         return comments
    }catch(err){
       throw err
    }
   }