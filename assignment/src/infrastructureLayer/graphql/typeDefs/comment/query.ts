import { gql } from "apollo-server";


export const query=gql`
   type Comment{
    assignment_id:String!,
    username:String!,
    comment:String!,
    type: String!
   }

   type AllComments{
    publicMessages:[Comment]
    privateMessages:[Comment]
   }
  

  type Query{
    getAllcomments(id:String!):AllComments
  }
 
`