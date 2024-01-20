import { IAssigmentRepository } from "../../interface/assignmentRepository";
import { IErrorHandler } from "../../interface/errorHandler";
import { IRequestValidator } from "../../interface/validateRepository";

export const getAllAssignments = async (
  assignmentRepo: IAssigmentRepository,
  errorHandler: IErrorHandler,
  requestValidator: IRequestValidator,
   id: string
) => {
  try {
    const validation = requestValidator.validateRequiredFields({ id }, ["id"]);

    if (!validation.success) {
      errorHandler.userInputError(validation.message as string);
    }
    const assignments = await assignmentRepo.getAllassignments(id);
    return assignments;
  } catch (err) {
    throw err;
  }
};
