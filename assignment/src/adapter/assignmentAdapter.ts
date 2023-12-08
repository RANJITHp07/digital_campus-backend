import { NextFunction,Request,Response} from "express";
import { ErrorHandler } from "../../../classroom/src/infrastructure/middleware/error/userErrorhandler";
import { IAssigment } from "../entites/assignment";
import { AssignmentUsecase } from "../usecase/assignmentusecase";

export class AssignmentController{
    private readonly assignmentusecase:AssignmentUsecase
    private readonly errorHandler:ErrorHandler
    
    constructor(assignmentusecase:AssignmentUsecase,errorHandler:ErrorHandler){
        this.assignmentusecase = assignmentusecase;
        this.errorHandler = errorHandler;
    }

    async create(_:unknown,args:{assignment:IAssigment}){
        try{
           const newAssignment=await this.assignmentusecase.createAssignment(args.assignment)
           return newAssignment
        }catch(err){
            this.errorHandler.apolloError(err)
        }
    }

    async getAllassignments(_:unknown,args:{id:string}){
        try{
            const newAssignment=await this.assignmentusecase.getAllassignments(args.id)
            return newAssignment
         }catch(err){
             this.errorHandler.apolloError(err)
         }
    }
    async getOneassignments(_:unknown,args:{id:string}){
        try{
            const assignment=await this.assignmentusecase.getOneAssignment(args.id)
            return assignment
         }catch(err){
             this.errorHandler.apolloError(err)
         }
    }

    async getgroupedAssignments(_:unknown,args:{id:string}){
        try{
            const assignment=await this.assignmentusecase.getgroupedAssignment(args.id)
            return assignment
         }catch(err){
             this.errorHandler.apolloError(err)
         }
    }

    async getdistinctmainTopic(_:unknown,args:unknown){
        try{
            const assignment=await this.assignmentusecase.getDistinctMaintopic()
            return assignment
         }catch(err){
             this.errorHandler.apolloError(err)
         }
    }
}
