import { gql } from "apollo-server";

export const assignmentQuery = gql`
  type DueDate {
    day: String
    time: String
    timer:[String]
  }

  type Polling{
    answers:[String],
    polling:[Int]
  }

  type Attachment {
    type: String
    content: String
  }

  type Quiz{
    question:String,
   answers:[String],
   type:String
   realAnswers:[String]
  }

  type Assignment {
    _id: String
    assignmentType: String
    mainTopic: String
    title: String
    dueDate: DueDate
    class_id: [String!]!
    students: [String!]!
    instruction: String
    attachment: Attachment
    polling:Polling,
    quiz:[Quiz],
    creator: String
    createdAt: String
  }

  type GroupedAssignment {
    _id: String
    assignments: [Assignment]
  }

  type Distinct {
    mainTopic: [String!]
  }

  type Query {
    getAllassignment(id:  ID!): [Assignment]
    getgroupedAssignment(id: ID!): [GroupedAssignment]
    getOneassignment(id:  ID!): Assignment
    getdistinctmainTopic(id:ID!): Distinct
    getDueDates(id: String!): [Assignment]
  }
`;
