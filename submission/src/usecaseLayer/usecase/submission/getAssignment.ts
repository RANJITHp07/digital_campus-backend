import { IAssignmentRepository } from "../../interface/assignment"
import { IErrorHandler } from "../../interface/errorHandler"

export const getAssignment=async(assignmentRepository:IAssignmentRepository, errorHandler:IErrorHandler,id:string)=>{
    try{
      const submission=await assignmentRepository.findAssignment(id)
      if(submission) return submission
      errorHandler.userInputError("No such polling")
    }catch(err){
      throw err
    }
  }