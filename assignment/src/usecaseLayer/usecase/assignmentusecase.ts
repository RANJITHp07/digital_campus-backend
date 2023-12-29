import { ErrorHandler } from "../../infrastructureLayer/middleware/error/userErrorhandler"; 
import { IAssigment } from "../../domainLayer/assignment";
import { AssignmentRepository } from "../../infrastructureLayer/repository/queries/assignmentRepository";
import Publisher from "../../infrastructureLayer/repository/rabbitmq/publishrepository";

export class AssignmentUsecase{
     private readonly assignment:AssignmentRepository
     private readonly errorHandler:ErrorHandler
     private readonly publisher:Publisher
     
     constructor(assignment:AssignmentRepository,errorHandler:ErrorHandler,publisher:Publisher) {
        this.assignment = assignment;
        this.errorHandler = errorHandler;
        this.publisher = publisher;
     }

     async createAssignment(assignment:IAssigment){
        try{
            
            const newAssignment=await this.assignment.create(assignment)
            let exchangeAssignment:any={
                id:newAssignment._id,
                students:newAssignment.students
            }
             if(newAssignment.assignmentType==='Polling'){
                exchangeAssignment.polling=newAssignment.polling
             }else if(newAssignment.assignmentType==='Quiz'){
                 exchangeAssignment.quiz=newAssignment.quiz
             }else if(newAssignment.assignmentType==='Assignment' && newAssignment.dueDate){
                 exchangeAssignment.points=newAssignment.points
                 exchangeAssignment.dueDate=newAssignment.dueDate
             }
             newAssignment.assignmentType!=='Material' && newAssignment.assignmentType!=='Announcement' && await this.publisher.publish("assignmentExchange","createAssignment",exchangeAssignment)
            return newAssignment
        }catch(err){
            this.errorHandler.apolloError(err)
        }
     }

     async getAllassignments(id:string){
        try{
            const assignmnets=await this.assignment.getAllassignments(id)
            return assignmnets
        }catch(err){
            this.errorHandler.apolloError(err)
        }
     }

     async getOneAssignment(id:string){
        try{
            const assignmnets=await this.assignment.getOneAssignment(id)
            return assignmnets
        }catch(err){
            this.errorHandler.apolloError(err)
        }
     }

     async getgroupedAssignment(id:string){
        try{
            const assignmnets=await this.assignment.groupedAssignment(id)
            return assignmnets
        }catch(err){
            this.errorHandler.apolloError(err)
        }
     }

     async getDistinctMaintopic(){
        try{
            const assignmnets=await this.assignment.distinctTopic()
            return {
                mainTopic:assignmnets
            }
        }catch(err){
            this.errorHandler.apolloError(err)
        }
     }

     async deleteAssignment(id:string){
        try{
            const deletedAssignment=await this.assignment.deleteAssignment(id);
            return deletedAssignment
        }catch(err){
            this.errorHandler.apolloError(err)
        }
     }

     async updateAssignment(id:string,update:Partial<IAssigment>){
        try{
            const updatedAssignment=await this.assignment.update(id,update);
            return updatedAssignment
        }catch(err){
            this.errorHandler.apolloError(err)
        }
     }

     async findAssignment(id:string){
        try{
            const assignment=await this.assignment.findAssignments(id);
            return assignment
        }catch(err){
            this.errorHandler.apolloError(err)
        }
     }

}