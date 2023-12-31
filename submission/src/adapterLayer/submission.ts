import { NextFunction,Request,Response } from "express"
import submissionModel from "../infrastructureLayer/model/submission"
import { Assignment } from "../infrastructureLayer/respository/assignment"
import { ISubmission } from "../domainLayer/submission"
import { Submissionusecase } from "../usecaseLayer/usecase/submissionusecase"

export class Submission{

    private readonly submissionUsecase:Submissionusecase

    constructor(submissionUsecase:Submissionusecase){
        this.submissionUsecase = submissionUsecase
    }
    // async Polling(req:Request,res:Response,next:NextFunction){
    //     try{
    //         const assignment=new Assignment()
    //         if(req.body.pollingAnswers){
    //             await submissionModel.create(req.body)
    //             const a=await assignment.findAssignment(req.body.assignment_id)
    //             if(a){
    //                 a.polling.answers.indexOf(req.body.pollingAnswers);
                    
    //             }
                

    //         }

    //     }catch(err){
    //         throw err
    //     }
    // }

    async createSubmission(_:unknown,args:{submission:ISubmission}){
      try{
          const newSubmission=await this.submissionUsecase.createSubmission(args.submission)
          return newSubmission
      }catch(err){
        throw err
      }
    }
}