import { gql } from "apollo-server";

export const classroomQuery=gql`


  type ClassRoom{
     _id:ID!,
     className:String!,
     classSubject:String!,
     classSection:String!,
     students_enrolled:[String],
     admins:[String],
     classCode:String,
  }


  type Query{
    getClass(code:String!):ClassRoom
    getAllClassroom(id:String!):[ClassRoom]
    getCreatorClassroom(id:String!):[ClassRoom]
  }

`