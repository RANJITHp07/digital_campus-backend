import { gql } from "apollo-server";

export const classroomQuery=gql`


  type ClassRoom{
     _id:ID!,
     className:String!,
     classSubject:String!,
     classSection:String!,
     creator:String!,
     students_enrolled:[String],
     admins:[String],
     classCode:String,
  }

  type Participants{
    username:String!,
    profile:String 
  
  }


  type Query{
    getClass(code:String!):ClassRoom
    getAllClassroom(id:String!):[ClassRoom]
    getClassroomDetails(id:String!):ClassRoom
    getCreatorClassroom(id:String!):[ClassRoom]
    getAllClassroomparticipants(id:String!):[Participants]
  }

`