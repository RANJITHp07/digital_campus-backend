import { IAssigmentRepository } from "../../interface/assignmentRepository";
import { IErrorHandler } from "../../interface/errorHandler";
import { IRequestValidator } from "../../interface/validateRepository";

export const getOneAssignment = async (
  assignmentRepository: IAssigmentRepository,
  errorHandler: IErrorHandler,
  requestValidator: IRequestValidator,
  id: string
) => {
  try {
    // Validating parameters
    const validation = requestValidator.validateRequiredFields({ id }, ['id']);

    if (!validation.success) {
      errorHandler.userInputError(validation.message as string);
    }

    
    const assignment = await assignmentRepository.getOneAssignment(id);
    return assignment;
  } catch (err) {
    // Consider logging the error details or providing a more descriptive error message
    throw err;
  }
};
