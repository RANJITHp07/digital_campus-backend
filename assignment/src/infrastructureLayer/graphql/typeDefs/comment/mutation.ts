import { gql } from "apollo-server";


export const commentMutation=gql`
  input CommentInput {
    assignment_id:ID!,
    username:String!,
    comment:String!,
    type: String!
  }

  type Output{
    message:String!
  }

  input ReplyInput{
     username:String!,
     replyComment: String!
  }

  type Mutation{
    createComment(comment:CommentInput):Output,
    deleteComment(id:String!):Output
    deleteReply(id:ID!,reply:ReplyInput):Output
    updateReply(id:ID!,reply:ReplyInput):Output

  }

`