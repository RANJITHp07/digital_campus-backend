import { gql } from "apollo-server";


export const commentMutation=gql`
  input CommentInput {
    assignment_id:String!,
    username:String!,
    comment:String!,
    type: String!
  }

  type Mutation{
  
  
  }
`