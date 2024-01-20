import { IAssignment } from "../../../domainLayer/assignment";
import { IAssigmentRepository } from "../../interface/assignmentRepository";
import { IErrorHandler } from "../../interface/errorHandler";
import IPublish from "../../interface/publishRepository";
import { IRequestValidator } from "../../interface/validateRepository";

export const updateAssignment=async(
    assignmentRepository: IAssigmentRepository,
    publisher: IPublish,
    errorHandler: IErrorHandler,
    requestValidator: IRequestValidator,
    id:string,
   update:Partial<IAssignment>)=>{
    try{
        //validating parameters
        const validation = requestValidator.validateRequiredFields(
            {id,update},
            ['id','update']
        );

        if (!validation.success) {
            errorHandler.userInputError(validation.message as string)
        }
        const updatedAssignment=await assignmentRepository.update(id,update);
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
            await publisher.publish("assignmentExchange","updateAssignment",{id,updateSubmission})
            return updatedAssignment
        }
        errorHandler.userInputError("No such assignment")
    }catch(err){
        throw err
    }
 }