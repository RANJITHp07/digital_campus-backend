import { gql } from "apollo-server-express";

export const submissionMutation = gql`

  
  
  input SubmitInput {
    status: String
    grade: Int
  }

  input AttachmentInput {
    type: String!
    content: String!
  }

  input SubmissionInput {
    assignment_id: ID!
    quizAnswers: [[String]]
    pollingAnswers: String
    username: String!
    user_id:String!
    submission: SubmitInput
    attachment: AttachmentInput
  }

  input GradeInput{
    assignment_id: ID!
    userId:ID!
    grade:Int
  }

  type Output {
    message: String
    marks:Int
  }

  type Mutation {
    createSubmission(submission: SubmissionInput): Output
    updateGrade(update:GradeInput):Output
  }
`;
