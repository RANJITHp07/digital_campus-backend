import { IClassroom } from "../../domainLayer/classroom";
import { IErrorHandler } from "../interface/errorHandler";
import { IClassroomRepository } from "./../interface/classroomRepository";

export const getClassroomDetailsWithId= async (
  classroomRepository: IClassroomRepository,
  errorHandler:IErrorHandler,
  id: string 
): Promise<IClassroom| null> => {
  try {
    const classroom = await classroomRepository.findAllparticipants(id);
    if(classroom) return classroom;
    errorHandler.userInputError("Wrong input id")
  } catch (err) {
    throw err;
  }
};
