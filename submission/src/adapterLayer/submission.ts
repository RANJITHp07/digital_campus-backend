import { NextFunction,Request,Response } from "express"

import { ISubmission } from "../domainLayer/submission"
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

    async getPolling(_:unknown,args:{id:string}){
      try{
        const submission=await this.submissionUsecase.getPolling(args.id);
        return submission
      }catch(err){
        throw err
      }
    }
}