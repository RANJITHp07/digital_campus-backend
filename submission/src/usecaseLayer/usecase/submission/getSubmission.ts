import { IErrorHandler } from "../../interface/errorHandler";
import { ISubmissionRepository } from "../../interface/submission";

export const getSubmission=async(submissionRepository:ISubmissionRepository, errorHandler:IErrorHandler,assignment_id: string, userId: string)=>{

    try{
         const submission=await submissionRepository.find(assignment_id,userId);
         if(submission) submission

         errorHandler.userInputError("No such submission")
    }catch(err){
      throw err
    }
  }