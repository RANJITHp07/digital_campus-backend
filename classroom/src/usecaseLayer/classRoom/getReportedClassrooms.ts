// getReportedClassroom.ts
import { IClassroom } from "../../domainLayer/classroom";
import { IClassroomRepository } from "./../interface/classroomRepository";

export const getReportedClassroom = async (
  classroomRepository: IClassroomRepository,
  page: number 
): Promise<IClassroom[]> => {
  try {
    const reportedClassroom = await classroomRepository.getReportedClassrooms(
      page,
      10
    );
    return reportedClassroom;
  } catch (err) {
    throw err;
  }
};
