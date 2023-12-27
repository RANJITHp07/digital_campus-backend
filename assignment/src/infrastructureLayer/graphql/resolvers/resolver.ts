import { assignmentQueries } from "./query/AssignmentQuery"
import { assignmentMutations } from "./mutation/AssignmentMutation"
import { commentQuery } from "./query/CommentQuery"
import { commentMutation } from "./mutation/CommentMutation"


export const resolver={
    Query: {
      //assignment
        getAllassignment: assignmentQueries.getAllassignment,
        getgroupedAssignment: assignmentQueries.getgroupedAssignment,
        getOneassignment: assignmentQueries.getOneassignment,
        getdistinctmainTopic: assignmentQueries.getdistinctmainTopic,
        getDueDates: assignmentQueries.getDueDates,

        //comments
        getAllComments:commentQuery.getAllComments,
      },

      Mutation: {
        //assignment
        createAssignment: assignmentMutations.createAssignment,
        deleteAssignment: assignmentMutations.deleteAssignment,
        updateAssignment: assignmentMutations.updateAssignment,

        //comments
        createComment:commentMutation.createComment,
        deleteComment: commentMutation.deleteComment
      }
}