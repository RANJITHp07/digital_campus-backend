import { classroomMutation } from "./mutation";
import { classroomQueries } from "./query";

export const resolver = {
  Query: {
    getClass: classroomQueries.getClass,
    getAllClassroom: classroomQueries.getAllClassroom,
    getCreatorClassroom: classroomQueries.getCreatorClassroom,
    getAllClassroomparticipants: classroomQueries.getAllClassroomparticipants,
    getAllUsersClassrooms: classroomQueries.getAllUsersClassrooms,
    getClassroomDetails: classroomQueries.getClassroomDetails,
    getAllTheClassroom: classroomQueries.getAllTheClassroom,
    getFilteredClassroom: classroomQueries.getFilteredClassroom,
    reportedClassroom: classroomQueries.reportedClassroom,
    searchClassroom: classroomQueries.searchClassroom
  },
  Mutation: {
    createClass: classroomMutation.createClass,
    updateClass: classroomMutation.updateClass,
    deleteClass: classroomMutation.deleteClass,
    addStudent: classroomMutation.addStudent,
    deleteStudent: classroomMutation.deleteStudent,
    addToAdmin: classroomMutation.addToAdmin,
    removeFromAdmin: classroomMutation.removeFromAdmin,
    emailInvitation: classroomMutation.emailInvitation,
    addRequest: classroomMutation.addRequest,
    removeRequest: classroomMutation.removeRequest,
  },
};
