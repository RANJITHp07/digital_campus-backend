import { IAssignment, IQuiz } from "../../domainLayer/assignment"
import { ISubmission } from "../../domainLayer/submission"
import { IAssignmentRepository } from "../interface/assignment"
import { IErrorHandler } from "../interface/errorHandler"
import { ISubmissionRepository } from "../interface/submission"
import { calculateQuizGrade, createSubmission, getAllSubmission, getAssignment, getSubmission, handlePollingAnswers, updateGrade } from "./submission/index"


export class Submissionusecase{
  
    private readonly submissionRepository:ISubmissionRepository
    private readonly assignmentRepository:IAssignmentRepository
    private readonly errorHandler:IErrorHandler

    constructor(submissionRepository:ISubmissionRepository,assignmentRepository:IAssignmentRepository,errorHandler:IErrorHandler) {
        this.submissionRepository = submissionRepository
        this.assignmentRepository = assignmentRepository
        this.errorHandler = errorHandler
    }

    //private methods
    private calculateQuizGrades(quizAnswers: string[][], quiz: IQuiz[]):number{
      return calculateQuizGrade(quizAnswers,quiz)
    }

    private handlePollingAnswers(submission: ISubmission, assignment:IAssignment){
      handlePollingAnswers(this.assignmentRepository,this.submissionRepository,this.errorHandler,submission,assignment)
    }
  
    
    async createSubmission({submission}:{submission:ISubmission}){
      return createSubmission(this.calculateQuizGrades,this.handlePollingAnswers,this.assignmentRepository,this.submissionRepository,this.errorHandler,submission)
    }

    
    async getAllSubmission(id:string){
      return getAllSubmission(this.submissionRepository,id)
    }

    async getAssignment(id:string){
      return getAssignment(this.assignmentRepository,this.errorHandler,id)
    }

    async updateGrade({assignment_id,userId,grade}:{assignment_id: string, userId: string, grade: number}){
      return updateGrade(this.submissionRepository,assignment_id,userId,grade)
    }

    async getSubmission({assignment_id,userId}:{assignment_id: string, userId: string}){
          return getSubmission(this.submissionRepository,this.errorHandler,assignment_id,userId);
    }
}