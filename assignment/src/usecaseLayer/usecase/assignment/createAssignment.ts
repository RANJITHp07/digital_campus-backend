
import { IAssignment } from "../../../domainLayer/assignment";
import { IAssigmentRepository } from "../../interface/assignmentRepository";
import IPublish from "../../interface/publishRepository";

export const createAssignment = async (
  assignmentRepository: IAssigmentRepository,
  publisher: IPublish,
  assignment: IAssignment
) => {
  try {
    const newAssignment = await assignmentRepository.create(assignment) as IAssignment & {_id:string};
    let exchangeAssignment: any = {
      id: newAssignment._id,
      students: newAssignment.students,
    };
    if (newAssignment.assignmentType === "Polling") {
      exchangeAssignment.polling = newAssignment.polling;
    } else if (newAssignment.assignmentType === "Quiz") {
      exchangeAssignment.quiz = newAssignment.quiz;
    } else if (newAssignment.assignmentType === "Assignment") {
      exchangeAssignment.points = newAssignment.points;
      exchangeAssignment.dueDate = newAssignment.dueDate;
    }
    newAssignment.assignmentType !== "Material" &&
      newAssignment.assignmentType !== "Announcement" &&
      (await publisher.publish(
        "assignmentExchange",
        "createAssignment",
        exchangeAssignment
      ));
    return newAssignment;
  } catch (err) {
    throw err;
  }
};
