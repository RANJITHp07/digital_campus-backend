import { gql } from "apollo-server";


export const classRoomMutation=gql`
   input Classroom{
     className:String!,
    classSection:String!,
    classSubject:String!,
    creator:String!
    students_enrolled:[String!],
    admins:[String]!
   }

   type Output{
     message:String!
   }

   input AddStudent{
     code:String!,
     userId:String!,
   }


   type  Mutation{
     createClass(classroom:Classroom): ClassRoom!
     deleteClass(id:String!):Output!
     updateClass(id:String!):Output!
     addStudent(addstudent:AddStudent):Output!
     deleteStudent(deletedstudent:AddStudent):Output!
   }
`