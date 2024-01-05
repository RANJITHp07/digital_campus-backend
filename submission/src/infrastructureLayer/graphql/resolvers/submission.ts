import { submissionMutation } from "./mutation";

export const resolver={
    Query:{
      getAssignment:()=>  "hii"
    },

    Mutation:{
        createSubmission:submissionMutation.createSubmission
    }

}  