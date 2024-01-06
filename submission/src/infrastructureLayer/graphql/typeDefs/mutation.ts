import { gql } from "apollo-server-express";

export const submissionMutation = gql`

  enum StatusEnum {
    LateSubmitted 
    Submitted
    NotSubmitted
  }
  
  input Submission {
    status: StatusEnum
    grade: Int
  }

  input AttachmentInput {
    type: String!
    content: String!
  }

  input SubmissionInput {
    assignment_id: ID!
    quizAnswers: [String]
    pollingAnswers: String
    username: String!
    user_id:String!
    submission: Submission
    attachment: AttachmentInput
  }

  type Output {
    message: String!
  }

  type Mutation {
    createSubmission(submission: SubmissionInput): Output
  }
`;
