import { IClassroom } from "../../../domainLayer/classroom";
import { errorHandler,controller } from "../injection/injection"

export const classroomMutation={
    async createClass(_:unknown,args:{classroom: IClassroom}){
        try{
          const classRoom=await controller.createClass(_,args);
          return classRoom
        }catch(err){
           errorHandler.apolloError(err)
        }
     },

    async updateClass(_:unknown,args:{id:string,update:Partial<IClassroom>}){
       try{
          const updatedClass=await controller.updateClass(_,args);
          return updatedClass
       }catch(err){
           errorHandler.apolloError(err)
       }
     },

     async deleteClass(_:unknown,args:{id:string}){
       try{
          const deletedClass=await controller.deleteClass(_,args)
          return deletedClass
       }catch(err){
           errorHandler.apolloError(err)
       }
     },

     async addStudent(_:unknown,args:{addstudent:{code:string,userId:string}}){
        try{
           const addstudent=await controller.addStudent(_,args)
           return addstudent
        }catch(err){
           errorHandler.apolloError(err)
       }
     },

     
     async deleteStudent(_:unknown,args:{deletedstudent:{code:string,userId:string}}){
        try{
           const deletedStudent=await controller.deleteStudent(_,args)
           return deletedStudent
        }catch(err){
           errorHandler.apolloError(err)
       }
     },

    async  addToAdmin(_:unknown,args:{id:string,classroomId:string}){
        try{
          const addAdmin=await controller.addToAdmin(_,args);
          return addAdmin
        }catch(err){
           errorHandler.apolloError(err)
        }
     },

     async  removeFromAdmin(_:unknown,args:{id:string,classroomId:string}){
        try{
          const addAdmin=await controller.removeFromAdmin(_,args);
          return addAdmin
        }catch(err){
           errorHandler.apolloError(err)
        }
     },

     async emailInvitation(_:unknown,args:{invitation:{fromEmail:string,toEmail: string, username: string,creator:string,code:string}}){
           try{
                const inivitation=await controller.emailInviation(_,args)
                return inivitation
           }catch(err){
              errorHandler.apolloError(err)
           }
     }
  }
