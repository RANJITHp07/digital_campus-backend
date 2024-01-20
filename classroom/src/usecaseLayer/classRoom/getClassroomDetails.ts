// getClassroom.ts
import { IClassroomRepository } from "../interface/classroomRepository";
import { IClassroom } from "../../domainLayer/classroom";
import { IErrorHandler } from "../interface/errorHandler";

export const getClassroomDetails = async (
  classroomRepository: IClassroomRepository,
  errorHandler: IErrorHandler,
  code: string 
): Promise<IClassroom> => {
  try {
    const classroom = await classroomRepository.findClassroom(code);
    if (classroom) {
      return classroom;
    }
    errorHandler.userInputError("No such code");
  } catch (err) {
    throw err;
  }
};
