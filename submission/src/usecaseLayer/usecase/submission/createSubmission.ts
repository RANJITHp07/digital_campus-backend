import { IAssignment, IQuiz } from "../../../domainLayer/assignment";
import { ISubmission } from "../../../domainLayer/submission";
import { Response } from "../../interface/Response";
import { IAssignmentRepository } from "../../interface/assignment";
import { IErrorHandler } from "../../interface/errorHandler";
import { ISubmissionRepository } from "../../interface/submission";
import { calculateQuizGrade } from "./calculateQuizGrade";
import { handlePollingAnswers } from "./handlePolling";

export const createSubmission=async(
    assignmentRepository:IAssignmentRepository,
    submissionRepository:ISubmissionRepository,
    errorHandler:IErrorHandler, submission: ISubmission):Promise<Response>=>{
    try {
      const submissionExist = await submissionRepository.find(submission.assignment_id, submission.user_id) as ISubmission;
      const assignment = await assignmentRepository.findAssignment(submission.assignment_id) as IAssignment;
  
      if (!assignment || !assignment.students.includes(submission.user_id)) {
        errorHandler.userInputError("Not a participant of this assignment");
      }
  
      if (submission.quizAnswers) {
        if (submissionExist) {
            errorHandler.userInputError("Already submitted");
          }

        const mark:number = calculateQuizGrade(submission.quizAnswers, assignment.quiz);
  
        let s={...submission,assignment:submission.assignment_id}
         await submissionRepository.create({
          ...s,
          submission: {
            status: "Submitted",
            grade: mark,
          },
        });
        return {
          marks: mark,
        };
      } else if (submission.pollingAnswers) {
        if (submissionExist) {
            errorHandler.userInputError("Already submitted");
          }
       return  handlePollingAnswers(assignmentRepository,submissionRepository,errorHandler,submission, assignment);
      } else if (submission.attachment) {
        if (submissionExist && submission.attachment) {
           await submissionRepository.update({ id: submissionExist._id as string, update: submission });
          return {
            message: "Resubmitted the assignment",
          };
        } else {
          let s={...submission,assignment:submission.assignment_id}
          await submissionRepository.create(s);
          return {
            message: "Submitted the assignment",
          };
        }
      }
      errorHandler.graphqlError("Enter the answers",'')
    } catch (err) {
      throw err;
    }
  }
  