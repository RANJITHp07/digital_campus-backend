// getCreatorClassrooms.ts
import { IClassroomRepository } from "./../interface/classroomRepository";
import { IClassroom } from "../../domainLayer/classroom";

export const getCreatorClassrooms = async (
  classroomRepository: IClassroomRepository,
   id: string 
): Promise<IClassroom[]> => {
  try {
    const classrooms = await classroomRepository.findCreatorClassrooms(id);
    return classrooms;
  } catch (err) {
    throw err;
  }
};
