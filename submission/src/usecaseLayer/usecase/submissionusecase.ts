import { ISubmission } from "../../domainLayer/submission"
import { AssignmentRepository } from "../../infrastructureLayer/respository/assignment"
import { SubmissionRepository } from "../../infrastructureLayer/respository/submission"
import { ErrorHandler } from "../../middleware/error/userErrorhandler"

export class Submissionusecase{
  
    private readonly submissionRepository:SubmissionRepository
    private readonly assignmentRepository:AssignmentRepository
    private readonly errorHandler:ErrorHandler

    constructor(submissionRepository:SubmissionRepository,assignmentRepository:AssignmentRepository,errorHandler:ErrorHandler) {
        this.submissionRepository = submissionRepository
        this.assignmentRepository = assignmentRepository
        this.errorHandler = errorHandler
    }
  
    async createSubmission({submission}:{submission:ISubmission}){
        try{
          let newSubmission
          if(submission.quizAnswers){

          }else if(submission.pollingAnswers){
                const assignment=await this.assignmentRepository.findAssignment(submission.assignment_id);
                const submissionExist=await this.submissionRepository.find(submission.assignment_id,submission.user_id)
                if(submissionExist){
                  this.errorHandler.userInputerror("Already submitted");
                  return
                }
                if(assignment && assignment.students.includes(submission.user_id)){
                  const index=assignment.polling.answers.indexOf(submission.pollingAnswers);
                  if(assignment.polling.polling){
                    assignment.polling.polling=assignment.polling.polling.map((m,i)=>{
                      if(index==i){
                        return (parseInt(m)+1).toString()
                      }
                      return m
                    })
                  }
                  const update=await this.assignmentRepository.update(assignment._id,assignment);
                  await this.submissionRepository.create(submission)
                  if(update){
                    return {
                      message:"successfully updated"
                    }
                  }

                  this.errorHandler.userInputerror("assignment id is wrong")
                  
                }

                this.errorHandler.userInputerror("Not a participant of this assignment")
                
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