import { Response } from "../../interface/Response"
import { ISubmissionRepository } from "../../interface/submission"

export const updateGrade=async(submissionRepository:ISubmissionRepository,assignment_id: string, userId: string, grade: number):Promise<Response>=>{
    try{
       const update=await submissionRepository.updateGrade(assignment_id,userId,grade)
       return update?
       {
        message:"Changed the mark"
       }:
       {
        message:"No change"
       }
    }catch(err){
      throw err
    }
  }