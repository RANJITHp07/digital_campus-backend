import { ClassroomController } from "../../../adapter/classroomController"
import { IClassroom } from "../../../entities/classroom"
import { Classroomusecase } from "../../../usecase/classRoomusecase"
import { ErrorHandler } from "../../middleware/error/userErrorhandler"
import classroomModel from "../../models/classroom"
import { ClassRoomRepository } from "../../repository/classroomRepository"
import { RandomNumber } from "../../repository/uniqueNumberRepository"


//factory method
const model=new classroomModel()
const repository=new ClassRoomRepository(model)
const code=new RandomNumber()
const errorHandler=new ErrorHandler()
const usecase=new Classroomusecase(repository,code,errorHandler)
const controller =new ClassroomController(usecase,errorHandler)


export const resolver={
   Query:{
       async getClass(_:unknown,args:{code:string}){
           try{
              const classRoom= await controller.getClass(_,args)
              return classRoom
           }catch(err){
            errorHandler.apolloError("INTERNAL_ERROR",err)
           }
       },

       async getAllClassroom(_:unknown,args:{id:string}){
         try{
             const classroom=await controller.getAllClassroom(_,args);
             return classroom
         }catch(err){
           errorHandler.apolloError("INTERNAL_ERROR",err)
         }
      },

      async getCreatorClassroom(_:unknown,args:{id:string}){
         try{
            const classroom=await controller.getCreatorClassroom(_,args)
            return classroom
         }catch(err){
            errorHandler.apolloError("INTERNAL_ERROR",err)
         }
      }
   },
   Mutation:{
      async createClass(_:unknown,args:{classroom: IClassroom}){
         try{
           const classRoom=await controller.createClass(_,args);
           return classRoom
         }catch(err){
            errorHandler.apolloError("INTERNAL_ERROR",err)
         }
      },

      async updateClass(_:unknown,args:{id:string,update:Partial<IClassroom>}){
        try{
           const updatedClass=await controller.updateClass(_,args);
           return updatedClass
        }catch(err){
            errorHandler.apolloError("INTERNAL_ERROR",err)
        }
      },

      async deleteClass(_:unknown,args:{id:string}){
        try{
           const deletedClass=await controller.deleteClass(_,args)
           return deletedClass
        }catch(err){
            errorHandler.apolloError("INTERNAL_ERROR",err)
        }
      },

      async addStudent(_:unknown,args:{addstudent:{code:string,userId:string}}){
         try{
            const addstudent=await controller.addStudent(_,args)
            return addstudent
         }catch(err){
            errorHandler.apolloError("INTERNAL_ERROR",err)
        }
      },

      
      async deleteStudent(_:unknown,args:{deletedstudent:{code:string,userId:string}}){
         try{
            const deletedStudent=await controller.deleteStudent(_,args)
            return deletedStudent
         }catch(err){
            errorHandler.apolloError("INTERNAL_ERROR",err)
        }
      },

   }
}