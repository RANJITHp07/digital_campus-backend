// deleteClassroom.ts
import { Response } from "../interface/Response";
import { IClassroomRepository } from "../interface/classroomRepository";
import { IErrorHandler } from "../interface/errorHandler";

export const deleteClassroom = async (
  classroomRepository: IClassroomRepository,
  errorHandler: IErrorHandler,
  id: string
):Promise<Response> => {
  try {
    const deleteClassroomResult = await classroomRepository.delete(id);
    // Add any additional logic or error handling if needed

    return deleteClassroomResult
      ? {
          message: "Successfully deleted",
        }
      : errorHandler.userInputError("Wrong classroom id");
  } catch (err) {
    throw err;
  }
};
