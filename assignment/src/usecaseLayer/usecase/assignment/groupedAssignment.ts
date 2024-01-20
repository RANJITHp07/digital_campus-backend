import { IAssigmentRepository } from "../../interface/assignmentRepository";
import { IErrorHandler } from "../../interface/errorHandler";
import { IRequestValidator } from "../../interface/validateRepository";

export const getGroupedAssignment=async(
    assignmentRepository: IAssigmentRepository,
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
        const assignmnets=await assignmentRepository.groupedAssignment(id)
        return assignmnets
    }catch(err){
        throw err
    }
 }