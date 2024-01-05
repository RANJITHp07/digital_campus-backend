import { ISubmission } from "../../domainLayer/submission"
import { AssignmentRepository } from "../../infrastructureLayer/respository/assignment"
import { SubmissionRepository } from "../../infrastructureLayer/respository/submission"

export class Submissionusecase{
  
    private readonly submissionRepository:SubmissionRepository
    private readonly assignmentRepository:AssignmentRepository

    constructor(submissionRepository:SubmissionRepository,assignmentRepository:AssignmentRepository){
        this.submissionRepository = submissionRepository
        this.assignmentRepository = assignmentRepository
    }
  
    async createSubmission({submission}:{submission:ISubmission}){
        try{
          let newSubmission
          if(submission.quizAnswers){

          }else if(submission.pollingAnswers){
                const assignment=await this.assignmentRepository.findAssignment(submission.assignment_id);
                if(assignment){
                  const index=assignment.polling.answers.indexOf(submission.pollingAnswers);
                  if(assignment.polling.polling){
                    assignment.polling.polling=assignment.polling.polling.map((m,i)=>{
                      if(index==i){
                        return m+1
                      }
                      return m
                    })
                  }else{
                    assignment.polling.polling=assignment.polling.answers.map((m,i)=>{
                      if(index==i){
                        return 1
                      }
                      return 0
                    })
                  }
                  const update=await this.submissionRepository.update(assignment._id);
                  return update
                }
                
          }else if(submission.attachment){
             newSubmission=await this.submissionRepository.create(submission)
          }
          return { 
            message:newSubmission
          }
        }catch(err){
            throw err
        }
    }

}