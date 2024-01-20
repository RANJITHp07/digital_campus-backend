import { IAssigmentRepository } from "../../interface/assignmentRepository";
import { IErrorHandler } from "../../interface/errorHandler";
import { IRequestValidator } from "../../interface/validateRepository";

export const findAssignment=async(
    assignmentRepository: IAssigmentRepository,
    errorHandler: IErrorHandler,
    requestValidator: IRequestValidator,
    userId:string)=>{
    try{
        //validating parameters
        const validation = requestValidator.validateRequiredFields(
            {userId},
            ['userId']
        );

        if (!validation.success) {
            errorHandler.userInputError(validation.message as string)
        }
        const assignment=await assignmentRepository.findAssignments(userId);
        return assignment
    }catch(err){
        throw err
    }
 }