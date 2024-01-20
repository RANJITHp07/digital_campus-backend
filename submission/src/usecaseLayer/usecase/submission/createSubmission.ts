import { IAssignment, IQuiz } from "../../../domainLayer/assignment";
import { ISubmission } from "../../../domainLayer/submission";
import { Response } from "../../interface/Response";
import { IAssignmentRepository } from "../../interface/assignment";
import { IErrorHandler } from "../../interface/errorHandler";
import { ISubmissionRepository } from "../../interface/submission";

export const createSubmission=async(
    calculateQuizGrade:(quizAnswers: string[][], quiz:IQuiz[])=>number,
    handlePollingAnswers:(submission: ISubmission, assignment: any)=>void,
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
  
        const s = await submissionRepository.create({
          ...submission,
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
        handlePollingAnswers(submission, assignment);
      } else if (submission.attachment) {
        if (submissionExist && submission.attachment) {
           await submissionRepository.update({ id: submissionExist._id as string, update: submission });
          return {
            message: "Resubmitted the assignment",
          };
        } else {
          await submissionRepository.create(submission);
          return {
            message: "Submitted the assignment",
          };
        }
      }
      errorHandler.graphqlError("Some error occurred",'')
    } catch (err) {
      throw err;
    }
  }
  