// getFilteredClassroom.ts
import { IClassroom } from "../../domainLayer/classroom";
import { IClassroomRepository } from "./../interface/classroomRepository";
import { IRequestValidator } from "./../interface/validateRepository";

export const getFilteredClassroom = async (
  classroomRepository: IClassroomRepository,
  requestValidator: IRequestValidator,
   userId: string,
    category: string[]
): Promise<IClassroom[]> => {
  try {
    const validation = requestValidator.validateRequiredFields(
      { userId, category },
      ["userId", "category"]
    );

    if (!validation.success) {
      throw new Error(validation.message as string);
    }

    const classrooms = await classroomRepository.classroomFilter(
      userId,
      category
    );
    return classrooms;
  } catch (err) {
    throw err;
  }
};
