import { ISubmission } from "../../../domainLayer/submission";
import { ISubmissionRepository } from "../../interface/submission";

export const  getAllSubmission=async(submissionRepository:ISubmissionRepository,id:string):Promise<ISubmission[]>=>{
    try{ 
          const submission=await submissionRepository.findAll(id) as ISubmission[];
          return submission
    }catch(err){
     throw err 
    }
 }