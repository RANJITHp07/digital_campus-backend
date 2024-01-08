import { submissionMutation } from "./mutation";
import { submissionQuery } from "./query";

export const resolver={
    Query:{
      getAllSubmission:submissionQuery.getAllSubmission,
      getPolling:submissionQuery.getPolling
    },

    Mutation:{
        createSubmission:submissionMutation.createSubmission,
        updateGrade:submissionMutation.updateGrade
    }

}  