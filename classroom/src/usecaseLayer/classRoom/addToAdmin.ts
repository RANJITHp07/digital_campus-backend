// addToAdmin.ts
import { Response } from "../interface/Response";
import { IErrorHandler } from "../interface/errorHandler";
import { IClassroomRepository } from "./../interface/classroomRepository";
import { IRequestValidator } from "./../interface/validateRepository";

export const addToAdmin = async (
  classroomRepository: IClassroomRepository,
  requestValidator: IRequestValidator,
  errorHandler:IErrorHandler,
    userId: string,
    classroomId: string,
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
    if (classroom && classroom.students_enrolled.includes(userId)) {
      classroom.admins.push(userId);
      classroom.students_enrolled = classroom.students_enrolled.filter(
        (studentId: string) => studentId !== userId
      );
      await classroomRepository.update(classroom._id as string, classroom);
      return {
        message: "Successfully added as admin",
      };
    } else {
      errorHandler.userInputError("No such student in the classroom");
    }
  } catch (err) {
    throw err;
  }
};
