import { ClassroomController } from "../../../adapter/classroomController"
import { IClassroom } from "../../../entities/classroom"
import { Classroomusecase } from "../../../usecase/classRoomusecase"
import { ErrorHandler } from "../../middleware/error/userErrorhandler"
import classroomModel from "../../models/classroom"
import { ClassRoomRepository } from "../../repository/classroomRepository"
import Listener from "../../repository/listenrepository"
import Nodemailer from "../../repository/nodemailerRepository"
import Publisher from "../../repository/publishrepository"
import { RandomNumber } from "../../repository/uniqueNumberRepository"


//factory method
const model=new classroomModel()
const repository=new ClassRoomRepository(model)
const code=new RandomNumber()
const errorHandler=new ErrorHandler()
const nodemailer=new Nodemailer()
const publish=new Publisher()
const listner=new Listener()
const usecase=new Classroomusecase(repository,code,errorHandler,publish,listner,nodemailer)
const controller =new ClassroomController(usecase,errorHandler)


export const resolver={
   Query:{
       async getClass(_:unknown,args:{code:string}){
         try{
            const classRoom= await controller.getClass(_,args)
            return classRoom
         }catch(err){
            errorHandler.apolloError(err)
         }
       },

       async getAllClassroom(_:unknown,args:{id:string}){
         try{
             const classroom=await controller.getAllClassroom(_,args);
             return classroom
         }catch(err){
           errorHandler.apolloError(err)
         }
      },

      async getCreatorClassroom(_:unknown,args:{id:string}){
         try{
            const classroom=await controller.getCreatorClassroom(_,args)
            return classroom
         }catch(err){
            errorHandler.apolloError(err)
         }
      },

      async getAllClassroomparticipants(_:unknown,args:{id:string}){
         try{
            const classroom=await controller.getAllparticipants(_,args)
            return classroom
         }catch(err){
            errorHandler.apolloError(err)
         }
      },

      async getclassroom(_:unknown,args:any){
         try{
               const classroom = await controller.getclassroom(_,args)
               return classroom
         }catch(err){
            errorHandler.apolloError(err)
         }
      },

      async getClassroomDetails(_:unknown,args:{id:string}){
         try{
            const classroom=await controller.getClassroomDetails(_,args)
            return classroom
         }catch(err){
            errorHandler.apolloError(err)
         }
      },

      async getAllTheClassroom(_:unknown,args:{id:string}){
         try{
            const classroom=await controller.getAllTheClasroom(_,args)
            return classroom
         }catch(err){
            errorHandler.apolloError(err)
         }
      },

      async getFilteredClassroom(_:unknown,args:{id:string,category:string[]}){
         try{
            const classroom=await controller.getFilteredclassroom(_,args)
            return classroom
         }catch(err){
             errorHandler.apolloError(err)
         }
      }
   },
   Mutation:{
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
}