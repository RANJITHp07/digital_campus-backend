import { controller,errorHandler } from "../injection/injection"
import { assignmentQueries } from "./query"
import { assignmentMutations } from "./resolver"


export const resolver={
    Query: {
        getAllassignment: assignmentQueries.getAllassignment,

        getgroupedAssignment: assignmentQueries.getgroupedAssignment,
        
        getOneassignment: assignmentQueries.getOneassignment,

        getdistinctmainTopic: assignmentQueries.getdistinctmainTopic,

        getDueDates: assignmentQueries.getDueDates,
      },

      Mutation: {
        createAssignment: assignmentMutations.createAssignment,

        deleteAssignment: assignmentMutations.deleteAssignment,
        
        updateAssignment: assignmentMutations.updateAssignment,
      }
}