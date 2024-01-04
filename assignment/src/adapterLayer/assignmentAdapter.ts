import { ErrorHandler } from "../infrastructureLayer/middleware/error/userErrorhandler";
import { IAssigment } from "../domainLayer/assignment";
import { AssignmentUsecase } from "../usecaseLayer/usecase/assignmentusecase";

export class AssignmentController{
    private readonly assignmentusecase:AssignmentUsecase
    
    constructor(assignmentusecase:AssignmentUsecase){
        this.assignmentusecase = assignmentusecase;
    }

    async create(_:unknown,args:{assignment:IAssigment}){
        try{
           const newAssignment=await this.assignmentusecase.createAssignment(args)
           return newAssignment
        }catch(err){
           throw err
        }
    }

    async getAllassignments(_:unknown,args:{id:string}){
        try{
            const newAssignment=await this.assignmentusecase.getAllassignments(args)
            return newAssignment
         }catch(err){
            throw err
         }
    }
    async getOneassignments(_:unknown,args:{id:string}){
        try{
            const assignment=await this.assignmentusecase.getOneAssignment(args)
            return assignment
         }catch(err){
            throw err
         }
    }

    async getgroupedAssignments(_:unknown,args:{id:string}){
        try{
            const assignment=await this.assignmentusecase.getGroupedAssignment(args)
            return assignment
         }catch(err){
            throw err
         }
    }

    async getdistinctmainTopic(_:unknown,args:unknown){
        try{
            const assignment=await this.assignmentusecase.getDistinctMaintopic()
            return assignment
         }catch(err){
            throw err
         }
    }

    async deleteAssignment(_:unknown,args:{id:string}){
        try{
            const assignment=await this.assignmentusecase.deleteAssignment(args)
            return assignment
         }catch(err){
            throw err
         }
    }

    async updateAssignment(_:unknown,args:{id:string,update:Partial<IAssigment>}){
        try{
            const updatedAssignment=await this.assignmentusecase.updateAssignment(args)
            return updatedAssignment
         }catch(err){
            throw err
         }
    }

    async findAssignment(_:unknown,args:{id:string}){
        try{
            const assignment=await this.assignmentusecase.findAssignment(args)
            return assignment
         }catch(err){
            throw err
         }
    }
}
