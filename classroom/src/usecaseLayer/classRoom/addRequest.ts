// addRequest.ts
import { Response } from "../interface/Response";
import { IClassroomRepository } from "./../interface/classroomRepository";
import { IErrorHandler } from "./../interface/errorHandler";

export const addRequest = async (
  classroomRepository: IClassroomRepository,
  errorHandler: IErrorHandler,
  id: string,
  name: string,
  email: string,
  code: string,
  type: boolean
): Promise<Response> => {
  try {
    const classroom = await classroomRepository.findClassroom(code);
    if (classroom) {
      if (type) {
        // Check if the request already exists based on id and name
        const requestExists = classroom.request.some(
          (request:{id:string,name:string}) => request.id === id && request.name === name
        );
        if (!requestExists) {
          classroom.request.push({ id: id, name: name, email: email });
          await classroomRepository.update(classroom._id as string, classroom);
          return {
            message: "Invitation to join sent to the admin",
          };
        } else {
          errorHandler.userInputError(
            "Already requested to this classroom"
          );
        }
      } else {
        classroom.request = classroom.request.filter(
          (request:{id:string,name:string}) => !(request.id === id && request.name === name)
        );
        await classroomRepository.update(classroom._id as string, classroom);
        return {
          message: "Removed the request",
        };
      }
    } else {
      errorHandler.userInputError("No such classroom");
    }
  } catch (err) {
    throw err;
  }
};
