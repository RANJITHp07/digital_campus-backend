import { gql } from "apollo-server";

export const classroomQuery=gql`

 type Reason{
      title:String,
      description:String,
      reporter:String
   }

  type Request{
    id:String!
    name:String!
    email:String!
    _id:ID!
  }  

  type ClassRoom{
     _id:ID!,
     className:String!,
     classSubject:String!,
     classSection:String!,
     creator:String!,
     students_enrolled:[String],
     admins:[String],
     classCode:String,
     backgroundPicture:String,
     themeColor:String,
     block:Boolean
     profile:String
     reported:Boolean,
     reason:[Reason]
     blockClassroom:Boolean
     request:[Request]
  }



  type Participants{
    id:String!
    username:String!,
    profile:String 
  
  }

  type GetallParticipants{
    admin:[Participants]!,
    user:[Participants]!
  }


  type Query{
    getClass(code:String!):ClassRoom
    getAllClassroom(id:String!):[ClassRoom]
    getClassroomDetails(id:String!):ClassRoom
    getCreatorClassroom(id:String!):[ClassRoom]
    getAllClassroomparticipants(id:String!):GetallParticipants
    getclassroom:[ClassRoom]
    reportedClassroom:[ClassRoom]
    getAllTheClassroom(id:String!):[ClassRoom]
    getFilteredClassroom(id:String!,category:[String]):[ClassRoom]
  }

`