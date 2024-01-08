import { ISubmission } from "../../domainLayer/submission"
import { ErrorHandler } from "../../infrastructureLayer/middleware/error/userErrorhandler"
import submissionModel from "../../infrastructureLayer/model/submission"
import { AssignmentRepository } from "../../infrastructureLayer/respository/assignment"
import { SubmissionRepository } from "../../infrastructureLayer/respository/submission"


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
          console.log(submission)
          let newSubmission
          const submissionExist=await this.submissionRepository.find(submission.assignment_id,submission.user_id)
          if(submission.quizAnswers){
            let mark=0
            const assignment=await this.assignmentRepository.findAssignment(submission.assignment_id);
            if(assignment && assignment.students.includes(submission.user_id)){
               for(let i=0;i<assignment.quiz.length;i++){
                if(submission.quizAnswers[i].length===1 && submission.quizAnswers[i][0]===assignment.quiz[i].realAnswers[0]){
                    mark=mark+1
                }else{
                   let pass=true
                  for(let j=0;j<submission.quizAnswers[i].length;j++){
                     if(!assignment.quiz[i].realAnswers.includes(submission.quizAnswers[i][j])){
                         pass=false;
                         break;
                     }
                  }

                  if(pass) mark=mark+1;
                }
               }
               console.log(mark)
            }
            this.errorHandler.userInputerror("Not a participant of this assignment")

          }else if(submission.pollingAnswers){
                const assignment=await this.assignmentRepository.findAssignment(submission.assignment_id);
                if(submissionExist){
                  this.errorHandler.userInputerror("Already submitted");
                  return
                }
                
                if(assignment && assignment.students.includes(submission.user_id)){
                  const index=assignment.polling.answers.indexOf(submission.pollingAnswers);
                  if(index==-1){
                    this.errorHandler.userInputerror("No such answer");
                    return 
                  }
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
            const assignment=await this.assignmentRepository.findAssignment(submission.assignment_id);
            console.log(assignment)
              if(assignment && !assignment.students.includes(submission.user_id)){
                this.errorHandler.userInputerror("Not a participant of this assignment")
                return ;
              }
            if(submissionExist && submission.attachment){
              console.log(submission)
                const updateSubmission=await this.submissionRepository.update({id:submissionExist._id,update:submission})
                return{
                  message:"Resubmitted the assignment"
                }
              
            }else{
              newSubmission=await this.submissionRepository.create(submission)
              return{
                message:"Submitted the assignment"
              }
            }
             
          }
          
        }catch(err){
            throw err
        }
    }


    async getAllSubmission(id:string){
       try{ 
             const submission=await this.submissionRepository.findAll(id);
             return submission
       }catch(err){
        throw err 
       }
    }

    async getPolling(id:string){
      try{
        const submission=await this.assignmentRepository.findAssignment(id)
        return submission
      }catch(err){
        throw err
      }
    }

    async updateGrade({assignment_id,userId,grade}:{assignment_id: string, userId: string, grade: number}){
      try{
         const update=await this.submissionRepository.updateGrade(assignment_id,userId,grade)
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

}