import { gql } from "apollo-server-express";

export const submissionQuery=gql`

type Quiz {
  question: String
  answers: [String]
}

type DueDate {
  day: String
  time: String
  timer: [String]
}

type Polling {
  answers: [String]
  polling: [String]
}

type Assignment {
  assignment_id: String!
  students: [String]
  dueDate: DueDate
  polling: Polling
  quiz: [Quiz]
  points: Int
}


type Submit {
  status: String
  grade: Int
}


type Attachment {
  type: String
  content: String
}

type Submission {
  quizAnswers: [String]
  pollingAnswers: String
  assignment_id: String
  attachment: Attachment
  submission: Submit
  username: String
  user_id: String
}

type Query{
 getAllSubmission(id:String):[Submission]
 getPolling(id:ID!):Assignment
}

`