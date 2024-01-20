// getAllClassroomParticipants.ts
import { IClassroomRepository } from "./../interface/classroomRepository";
import { IRequester } from "./../interface/requester";

export const getAllClassroomParticipants = async (
  classroomRepository: IClassroomRepository,
  requester: IRequester,
  id: string 
): Promise<unknown> => {
  try {
    const classroom = await classroomRepository.findAllparticipants(id);
    const data = await requester.publishWithReply(
      "classroomExchange",
      "studentDetails",
      { adminId: classroom?.admins, studentId: classroom?.students_enrolled }
    );
    return data;
  } catch (err) {
    throw err;
  }
};
