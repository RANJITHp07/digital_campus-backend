import { classroomMutation } from "./mutation";
import { classroomQueries } from "./query";

export const resolver={
   Query:{
    getClass: classroomQueries.getClass,
    getAllClassroom: classroomQueries.getAllClassroom,
    getCreatorClassroom: classroomQueries.getCreatorClassroom,
    getAllClassroomparticipants: classroomQueries.getAllClassroomparticipants,
    getclassroom: classroomQueries.getclassroom,
    getClassroomDetails: classroomQueries.getClassroomDetails,
    getAllTheClassroom: classroomQueries.getAllTheClassroom,
    getFilteredClassroom: classroomQueries.getFilteredClassroom,
   },
   Mutation:{
      createClass: classroomMutation.createClass,
      updateClass: classroomMutation.updateClass,
      deleteClass: classroomMutation.deleteClass,
      addStudent: classroomMutation.addStudent,
      deleteStudent: classroomMutation.deleteStudent,
      addToAdmin: classroomMutation.addToAdmin,
      removeFromAdmin: classroomMutation.removeFromAdmin,
      emailInvitation: classroomMutation.emailInvitation,
}

}