import { IAssignment} from "../../../domainLayer/assignment";
import { ISubmission } from "../../../domainLayer/submission";
import { IAssignmentRepository } from "../../interface/assignment";
import { IErrorHandler } from "../../interface/errorHandler";
import { ISubmissionRepository } from "../../interface/submission";

export const  handlePollingAnswers=async(
    assignmentRepository:IAssignmentRepository,
    submissionRepository:ISubmissionRepository,
    errorHandler:IErrorHandler,   
    submission: ISubmission, 
    assignment:IAssignment)=>{
      try{
        const index = assignment.polling.answers.indexOf(submission.pollingAnswers as string);

  
    if (index === -1) {
      errorHandler.userInputError("No such answer");
    }
  
    if (assignment.polling.polling) {
      assignment.polling.polling = assignment.polling.polling.map((m, i) => (index === i ? (parseInt(m) + 1).toString() : m));
    }

    let s={...submission,assignment:submission.assignment_id}
    const update = await assignmentRepository.update(assignment._id, assignment);
    await submissionRepository.create(s);
  
    if (update) {
      return {
        message: "Successfully updated",
      };
    }
  
    throw errorHandler.userInputError("Assignment id is wrong");
      }catch(err){
         console.log(err)
        throw err
      }
    
  }