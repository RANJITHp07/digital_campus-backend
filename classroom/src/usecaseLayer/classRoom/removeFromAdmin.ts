// removeFromAdmin.ts
import { Response } from "../interface/Response";
import { IErrorHandler } from "../interface/errorHandler";
import { IClassroomRepository } from "./../interface/classroomRepository";
import { IRequestValidator } from "./../interface/validateRepository";

export const removeFromAdmin = async (
  classroomRepository: IClassroomRepository,
  errorHandler:IErrorHandler,
  requestValidator: IRequestValidator,
    userId: string,
    classroomId: string
): Promise<Response> => {
  try {
    const validation = requestValidator.validateRequiredFields(
      { userId, classroomId },
      ["userId", "classroomId"]
    );

    if (!validation.success) {
      errorHandler.userInputError(validation.message as string);
    }

    const classroom = await classroomRepository.findClassroom(classroomId);
    if (classroom && classroom.admins.includes(userId)) {
      classroom.students_enrolled.push(userId);
      classroom.admins = classroom.admins.filter(
        (adminId: string) => adminId !== userId
      );
      await classroomRepository.update(classroom._id as string, classroom);
      return {
        message: "Successfully removed from admin",
      };
    } else {
      errorHandler.userInputError("No such classroom");
    }
  } catch (err) {
    throw err;
  }
};
