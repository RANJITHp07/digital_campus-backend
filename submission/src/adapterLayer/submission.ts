import { NextFunction,Request,Response } from "express"

import { ISubmission } from "../domainLayer/submission"
import { Submissionusecase } from "../usecaseLayer/usecase/submissionusecase"

export class Submission{

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
}