import { IAssignment } from "../../domainLayer/assignment";
import { createAssignment, deleteAssignment, findAssignment, getAllAssignments, getDistinctMaintopic, getGroupedAssignment, getOneAssignment, updateAssignment } from "./assignment/index";
import { IAssigmentRepository } from "../interface/assignmentRepository";
import { IErrorHandler } from "../interface/errorHandler";
import IPublish from "../interface/publishRepository";
import { IRequestValidator } from "../interface/validateRepository";

export class AssignmentUsecase{
     private readonly assignment:IAssigmentRepository
     private readonly errorHandler:IErrorHandler
     private readonly publisher:IPublish
     private requestValidator:IRequestValidator
     
     constructor(assignment:IAssigmentRepository,errorHandler:IErrorHandler,publisher:IPublish,requestValidator:IRequestValidator) {
        this.assignment = assignment;
        this.errorHandler = errorHandler;
        this.publisher = publisher;
        this.requestValidator = requestValidator;
     }

     async createAssignment({assignment}:{assignment:IAssignment}){
        return createAssignment(this.assignment,this.publisher,assignment)
     }

     async getAllassignments({id}:{id:string}){
        return getAllAssignments(this.assignment,this.errorHandler,this.requestValidator,id)
     }

     async getOneAssignment({id}:{id:string}){
        return getOneAssignment(this.assignment,this.errorHandler,this.requestValidator,id)
     }

     async getGroupedAssignment({id}:{id:string}){
       return getGroupedAssignment(this.assignment,this.errorHandler,this.requestValidator,id)
     }

     async getDistinctMaintopic(id:string){
        return getDistinctMaintopic(this.assignment,id)
     }

     async deleteAssignment({id}:{id:string}){
        return deleteAssignment(this.assignment,this.publisher,this.errorHandler,this.requestValidator,id)
     }

     async updateAssignment({id,update}:{id:string,update:Partial<IAssignment>}){
        return updateAssignment(this.assignment,this.publisher,this.errorHandler,this.requestValidator,id,update)
     }

     async findAssignment({id}:{id:string}){
        return findAssignment(this.assignment,this.errorHandler,this.requestValidator,id)
     }

}
