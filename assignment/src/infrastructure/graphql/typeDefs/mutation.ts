import { gql } from "apollo-server";

export const assignmentMutation = gql`
  

  input DueDateInput {
    day: String
    time: String
  }

  input Attachment {
    type: String
    content: String
  }

  input Polling{
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
    attachment: Attachment
    points:Int
    creator:String
    polling:Polling
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
  attachment: Attachments
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
