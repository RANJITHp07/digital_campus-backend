// getAllClassrooms.ts
import { IClassroomRepository } from "./../interface/classroomRepository";
import { IClassroom } from "../../domainLayer/classroom";

export const getAllClassrooms = async (
  classroomRepository: IClassroomRepository,
  id: string 
): Promise<IClassroom[]> => {
  try {
    const classrooms = await classroomRepository.findAllClassrooms(id);
    return classrooms;
  } catch (err) {
    throw err;
  }
};
