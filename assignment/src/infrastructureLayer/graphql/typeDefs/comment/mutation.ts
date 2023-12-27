import { gql } from "apollo-server";


export const commentMutation=gql`
  input CommentInput {
    assignment_id:String!,
    username:String!,
    comment:String!,
    type: String!
  }

  type Output{
    message:String!
  }

  type Mutation{
    createComment(comment:CommentInput):Output,
    deleteComment(id:String!):Output
  }
`