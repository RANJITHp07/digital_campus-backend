// updateClassroom.ts
import { IClassroom } from "../../domainLayer/classroom";
import { IClassroomRepository } from "./../interface/classroomRepository";
import { IRequestValidator } from "./../interface/validateRepository";
import { IErrorHandler } from "./../interface/errorHandler";
import { Response } from "../interface/Response";

export const updateClassroom = async (
  classroomRepository: IClassroomRepository,
  errorHandler: IErrorHandler,
  requestValidator: IRequestValidator,
  id: string,
  update: Partial<IClassroom>
): Promise<Response> => {
  try {
    // Validate required parameters
    const validation = requestValidator.validateRequiredFields({ id, update }, [
      "id",
      "update",
    ]);

    if (!validation.success) {
      errorHandler.userInputError(validation.message as string);
    }

    const updatedClassroom = await classroomRepository.update(id, update);
    return updatedClassroom
      ? {
          message: "Successfully updated",
        }
      : errorHandler.userInputError("Wrong classroom id");
  } catch (err) {
    throw err;
  }
};
