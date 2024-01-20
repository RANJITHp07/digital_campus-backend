// addUser.ts
import { Response } from "../interface/Response";
import { IClassroomRepository } from "./../interface/classroomRepository";
import { IErrorHandler } from "./../interface/errorHandler";
import { IRequestValidator } from "./../interface/validateRepository";

export const addUser = async (
  classroomRepository: IClassroomRepository,
  errorHandler: IErrorHandler,
  requestValidator: IRequestValidator,
  code: string,
  userId: string,
  type: boolean
): Promise<Response> => {
  // Validate required parameters
  const validation = requestValidator.validateRequiredFields(
    { code, userId, type },
    ["code", "userId", "type"]
  );

  if (!validation.success) {
    errorHandler.userInputError(validation.message as string);
  }
  try {
    const classroom = await classroomRepository.findClassroom(code);

    if (classroom?.students_enrolled) {
      if (classroom.block) {
        errorHandler.graphqlError("The classroom is closed", "");
      }
      if (type) {
        if (classroom.students_enrolled.includes(userId)) {
          // If the student is already inside the classroom
          errorHandler.graphqlError("Already inside the classroom", "");
        } else if (classroom.admins.includes(userId)) {
          // If the user is an admin
          errorHandler.graphqlError("Already an admin of this classroom", "");
        }
        classroom.students_enrolled.push(userId);
        classroom.request = classroom.request.filter((p:{id:string,name:string}) => p.id !== userId);
      } else {
        classroom.students_enrolled = classroom.students_enrolled.filter(
          (studentId: string) => studentId !== userId
        );
      }

      await classroomRepository.update(classroom._id as string, classroom);

      return type
        ? {
            message: "Added to the classroom",
          }
        : {
            message: "Removed from the classroom",
          };
    } else {
      // If code does not exist
      errorHandler.userInputError("No such classroom");
    }
  } catch (err) {
    throw err;
  }
};
