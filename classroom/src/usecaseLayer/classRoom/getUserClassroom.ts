// getAllTheClassroom.ts
import { IClassroom } from "../../domainLayer/classroom";
import { IClassroomRepository } from "./../interface/classroomRepository";

export const getAllTheClassroom = async (
  classroomRepository: IClassroomRepository,
  id: string 
): Promise<IClassroom[]> => {
  try {
    const classroom = await classroomRepository.findAllClassrooms(id);
    return classroom;
  } catch (err) {
    throw err;
  }
};
