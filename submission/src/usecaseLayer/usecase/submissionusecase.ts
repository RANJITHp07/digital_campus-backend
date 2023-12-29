import { SubmissionRepository } from "../../infrastructureLayer/respository/submission"

export class Submissionusecase{
  
    private readonly submissionRepository:SubmissionRepository


    constructor(submissionRepository:SubmissionRepository){
        this.submissionRepository = submissionRepository
    }
  
    async createSubmission(submission:any){
        try{
          const newSubmission=await this.submissionRepository.create(submission)
          return { 
            message:newSubmission
          }
        }catch(err){
            throw err
        }
    }

}