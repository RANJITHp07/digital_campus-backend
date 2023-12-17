import { gql } from "apollo-server";

export const assignmentMutation = gql`
  
  input DueDateInput {
    day: String
    time: String
    timer:[String]
  }

  input AttachmentInput {
    type: String
    content: String
  }

  input QuizInput{
    question:String,
   answers:[String],
   type:String
  }

  input PollingInput{
    answers:[String],
    polling:[Int]
  }

  input AssignmentInput {
    assignmentType: String!
    mainTopic: String
    title: String!
    dueDate: DueDateInput
    class_id: [String]!
    students: [String]!
    instruction: String
    attachment: AttachmentInput
    points:Int
    creator:String
    polling:PollingInput
    quiz:[QuizInput]
  }

  type Assignment {
  _id:String
  assignmentType: String
  mainTopic: String
title: String
  dueDate: DueDate
  class_id: [String!]!
  students: [String!]!
  instruction: String
  attachment: Attachment
  creator:String
  createdAt:String
  points:Int
}
  
  type Output {
    message: String!
  }

  type Mutation {
    createAssignment(assignment: AssignmentInput): Assignment
    deleteAssignment(id:String!):Assignment
    updateAssignment(id:String!,update:AssignmentInput):Assignment
  }
`;
