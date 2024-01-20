import { ISubmission } from "../domainLayer/submission"
import { getAssignment } from "../usecaseLayer/usecase/submission"
import { Submissionusecase } from "../usecaseLayer/usecase/submissionusecase"

export class SubmissionController{

    private readonly submissionUsecase:Submissionusecase

    constructor(submissionUsecase:Submissionusecase){
        this.submissionUsecase = submissionUsecase
    }
    async createSubmission(_:unknown,args:{submission:ISubmission}){
      try{
          const newSubmission=await this.submissionUsecase.createSubmission(args)
          return newSubmission
      }catch(err){
        throw err
      }
    }


    async getAllSubmission(_:unknown,args:{id:string}){
      try{
        const submission=await this.submissionUsecase.getAllSubmission(args.id);
        return submission
      }catch(err){
        throw err
      }
    }

    async getAssignment(_:unknown,args:{id:string}){
      try{
        const submission=await this.submissionUsecase.getAssignment(args.id);
        return submission
      }catch(err){
        throw err
      }
    }

    async updateGrade(_:unknown,args:{update:{assignment_id: string, userId: string, grade: number}}){
       try{ 
        const submission=await this.submissionUsecase.updateGrade(args.update)
        return submission
       }catch(err){
        throw err
       }
    }

    // async getSubmission(_:unknown,args:{}){
    //     try{
    //       const submission=await this.submissionUsecase.
    //     }catch(err){
    //       throw err
    //     }
    // }
}