import { gql } from "apollo-server";


export const classRoomMutation=gql`
   input Classroom{
     className:String!,
    classSection:String!,
    classSubject:String!,
    creator:String!
    students_enrolled:[String!],
    admins:[String]!,
    backgroundPicture:String! 
    category:String!
   }

   type Output{
     message:String!
   }

   input AddStudent{
     code:String!,
     userId:String!,
   }

   input updateClasroom{
     className:String,
     classSection:String,
     classSubject:String,
     backgroundPicture:String,
     themeColor:String 
   }

   input Invitation{
     fromEmail:String!,
     toEmail:String!,
     creator:String!,
     username:String!,
     code:String!
   }


   type  Mutation{
     createClass(classroom:Classroom): ClassRoom!
     deleteClass(id:String!):Output!
     updateClass(id:String!,update:updateClasroom):Output!
     addStudent(addstudent:AddStudent):Output!
     deleteStudent(deletedstudent:AddStudent):Output!
     addToAdmin(id:String,classroomId:String):Output!
     removeFromAdmin(id:String,classroomId:String):Output!
     emailInvitation(invitation:Invitation):Output!
   }
`