import { assignmentQueries } from "./query/AssignmentQuery"
import { assignmentMutations } from "./mutation/AssignmentMutation"


export const resolver={
    Query: {
      //assignment
        getAllassignment: assignmentQueries.getAllassignment,
        getgroupedAssignment: assignmentQueries.getgroupedAssignment,
        getOneassignment: assignmentQueries.getOneassignment,
        getdistinctmainTopic: assignmentQueries.getdistinctmainTopic,
        getDueDates: assignmentQueries.getDueDates,

        //comments
      },

      Mutation: {
        //assignment
        createAssignment: assignmentMutations.createAssignment,
        deleteAssignment: assignmentMutations.deleteAssignment,
        updateAssignment: assignmentMutations.updateAssignment,

        //comments
      }
}