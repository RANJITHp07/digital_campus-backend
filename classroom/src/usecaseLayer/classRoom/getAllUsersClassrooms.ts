// getClassrooms.ts
import { IClassroom } from "../../domainLayer/classroom";
import { IClassroomRepository } from "../interface/classroomRepository";

export const getAllUsersClassrooms = async (
  classroomRepository: IClassroomRepository,
  page: number 
): Promise<IClassroom[]> => {
  try {
    const classroom = await classroomRepository.findAllUsersClassroom(page, 10);
    return classroom;
  } catch (err) {
    throw err;
  }
};
