import { IAssigmentRepository } from "../../interface/assignmentRepository";
import { IErrorHandler } from "../../interface/errorHandler";
import IPublish from "../../interface/publishRepository";
import { IRequestValidator } from "../../interface/validateRepository";

export const deleteAssignment=async(
    assignmentRepository: IAssigmentRepository,
    publisher: IPublish,
    errorHandler: IErrorHandler,
    requestValidator: IRequestValidator,
    id:string
    )=>{
    try{
        //validating parameters
        const validation = requestValidator.validateRequiredFields(
            {id},
            ['id']
        );

        if (!validation.success) {
            errorHandler.userInputError(validation.message as string)
        }
        const deletedAssignment=await assignmentRepository.deleteAssignment(id);
        if(deletedAssignment){
            
            await publisher.publish("assignmentExchange","deleteAssignment",{id})
            return deletedAssignment
        }
        errorHandler.userInputError("No such assignment")
    }catch(err){
        throw err
    }
 }