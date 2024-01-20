import { IClassroom } from "../../domainLayer/classroom";
import { IClassroomRepository } from "../interface/classroomRepository";
import { IErrorHandler } from "../interface/errorHandler";
import { IRandomgenerator } from "../interface/uniqueRepositroy";
import { IRequestValidator } from "../interface/validateRepository";

export const createClassroom = async (
    classroomRepository: IClassroomRepository,
    errorHandler: IErrorHandler,
    requestValidator: IRequestValidator,
    randomGenerator: IRandomgenerator,
    classroom: IClassroom
  ):Promise<IClassroom> => {
    try {
      const validation = requestValidator.validateRequiredFields(classroom, [
        "className",
        "classSection",
        "classSubject",
        "creator",
        "admins",
        "backgroundPicture",
        "category",
      ]);
  
      if (!validation.success) {
        errorHandler.userInputError(validation.message as string);
      }
  
      const code = await randomGenerator.generateUniqueRandomCode();
      const newClasroom = { ...classroom, classCode: code };
      const newclassroom = await classroomRepository.create(newClasroom);
      return newclassroom;
    } catch (err) {
      throw err;
    }
  };