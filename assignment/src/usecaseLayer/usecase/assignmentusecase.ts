import { ErrorHandler } from "../../infrastructureLayer/middleware/error/userErrorhandler"; 
import { IAssigment } from "../../domainLayer/assignment";
import { AssignmentRepository } from "../../infrastructureLayer/repository/queries/assignmentRepository";
import Publisher from "../../infrastructureLayer/repository/rabbitmq/publishrepository";
import RequestValidator from "../../infrastructureLayer/repository/service/validatorRepository";

export class AssignmentUsecase{
     private readonly assignment:AssignmentRepository
     private readonly errorHandler:ErrorHandler
     private readonly publisher:Publisher
     private requestValidator:RequestValidator
     
     constructor(assignment:AssignmentRepository,errorHandler:ErrorHandler,publisher:Publisher,requestValidator:RequestValidator) {
        this.assignment = assignment;
        this.errorHandler = errorHandler;
        this.publisher = publisher;
        this.requestValidator = requestValidator;
     }

     async createAssignment({assignment}:{assignment:IAssigment}){
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
             }else if(newAssignment.assignmentType==='Assignment'){
                 exchangeAssignment.points=newAssignment.points
                 exchangeAssignment.dueDate=newAssignment.dueDate
             }
             newAssignment.assignmentType!=='Material' && newAssignment.assignmentType!=='Announcement' && await this.publisher.publish("assignmentExchange","createAssignment",exchangeAssignment)
            return newAssignment
        }catch(err){
            throw err
        }
     }

     async getAllassignments({id}:{id:string}){
        try{
            // Validate required parameters
        const validation = this.requestValidator.validateRequiredFields(
            {id},
            ['id']
        );

        if (!validation.success) {
            this.errorHandler.userInputerror(validation.message as string)
        }
            const assignmnets=await this.assignment.getAllassignments(id)
            return assignmnets
        }catch(err){
            throw err
        }
     }

     async getOneAssignment({id}:{id:string}){
        try{
            //validating parameters
            const validation = this.requestValidator.validateRequiredFields(
                {id},
                ['id']
            );
    
            if (!validation.success) {
                this.errorHandler.userInputerror(validation.message as string)
            }
            const assignmnets=await this.assignment.getOneAssignment(id)
            return assignmnets
        }catch(err){
            throw err
        }
     }

     async getGroupedAssignment({id}:{id:string}){
        try{
            //validating parameters
            const validation = this.requestValidator.validateRequiredFields(
                {id},
                ['id']
            );
    
            if (!validation.success) {
                this.errorHandler.userInputerror(validation.message as string)
            }
            const assignmnets=await this.assignment.groupedAssignment(id)
            return assignmnets
        }catch(err){
            throw err
        }
     }

     async getDistinctMaintopic(){
        try{
            const topics=await this.assignment.distinctTopic()
            return {
                mainTopic:topics
            }
        }catch(err){
            throw err
        }
     }

     async deleteAssignment({id}:{id:string}){
        try{
            //validating parameters
            const validation = this.requestValidator.validateRequiredFields(
                {id},
                ['id']
            );
    
            if (!validation.success) {
                this.errorHandler.userInputerror(validation.message as string)
            }
            const deletedAssignment=await this.assignment.deleteAssignment(id);
            if(deletedAssignment){
                
                await this.publisher.publish("assignmentExchange","deleteAssignment",{id})
                return deletedAssignment
            }
            this.errorHandler.userInputerror("No such assignment")
        }catch(err){
            throw err
        }
     }

     async updateAssignment({id,update}:{id:string,update:Partial<IAssigment>}){
        try{
            //validating parameters
            const validation = this.requestValidator.validateRequiredFields(
                {id,update},
                ['id','update']
            );
    
            if (!validation.success) {
                this.errorHandler.userInputerror(validation.message as string)
            }
            const updatedAssignment=await this.assignment.update(id,update);
            const updateSubmission:any={}
            if(updatedAssignment){
                if(update.polling){
                    updateSubmission.polling=update.polling
                 }else if(update.quiz){
                    updateSubmission.quiz=update.quiz
                 }else if(update.points){
                    updateSubmission.points=update.points
                 }else if(update.dueDate){
                    updateSubmission.dueDateupdate.dueDate
                 }
                await this.publisher.publish("assignmentExchange","updateAssignment",{id,updateSubmission})
                return updatedAssignment
            }
            this.errorHandler.userInputerror("No such assignment")
        }catch(err){
            throw err
        }
     }

     async findAssignment({id}:{id:string}){
        try{
            //validating parameters
            const validation = this.requestValidator.validateRequiredFields(
                {id},
                ['id']
            );
    
            if (!validation.success) {
                this.errorHandler.userInputerror(validation.message as string)
            }
            const assignment=await this.assignment.findAssignments(id);
            return assignment
        }catch(err){
            throw err
        }
     }

}
