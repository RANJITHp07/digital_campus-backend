import { UserInputError } from "apollo-server-express";
import { IClassroom } from "../entities/classroom";
import { ErrorHandler } from "../infrastructure/middleware/error/userErrorhandler";
import { ClassRoomRepository } from "../infrastructure/repository/classroomRepository";
import { RandomNumber } from "../infrastructure/repository/uniqueNumberRepository";

export class Classroomusecase{
 
     private readonly classroomrepository:ClassRoomRepository
     private readonly randomGenerator: RandomNumber
     private readonly errorHandler:ErrorHandler

     constructor(classroomrepository:ClassRoomRepository,randomGenerator:RandomNumber,errorHandler:ErrorHandler) {
         this.classroomrepository = classroomrepository;
         this.randomGenerator = randomGenerator;
         this.errorHandler=errorHandler;
     }

     async create(classroom:IClassroom):Promise<unknown>{
        try{
          const code=await this.randomGenerator.generateUniqueRandomCode()
           const newClasroom={...classroom,classCode:code}
            const newclassroom= await this.classroomrepository.create(newClasroom)
            return {
               success:true,
               message:newclassroom
            }
        }catch(err){
          this.errorHandler.graphqlError("INTERNAL_SERVER",err,"internal server error occured")
        }
     }

     async update(id:string,update:Partial<IClassroom>):Promise<unknown>{
          try{
               const updateClassroom=await this.classroomrepository.update(id,update);
               return {
                    success:true,
                    messsage:updateClassroom
               }
          }catch(err){
                 this.errorHandler.graphqlError("INTERNAL_SERVER",err,"internal server error occured")
          }
     }

     async delete(id:string){
          try{
               const deleteClassroom=await this.classroomrepository.delete(id);
               return {
                    success:true,
                    messsage:deleteClassroom
               }
          }catch(err){
               return this.errorHandler.graphqlError("INTERNAL_SERVER",err,"internal server error occured")
          }
     }

     async addUser(code:string,userId:string,type:boolean):Promise<unknown>{
          try{
              const classroom=await this.classroomrepository.getClassroom(code)
              let adduser:string;
              if(classroom?.students_enrolled){
              if(type){
                if(classroom.students_enrolled.includes(userId)){
                    return {
                         success:false,
                         message:"Already inside classroom"
                        }
                }
               classroom.students_enrolled.push(userId);
              }else{
               classroom.students_enrolled = classroom.students_enrolled.filter(studentId => studentId !== userId);
              }
              adduser=await this.classroomrepository.create(classroom)
              return {
                  success:true,
                  message:adduser
              }
          }else{
              return {
               success:true,
               message:"No such  classroom"
              }
          }
          }catch(err){
               
               this.errorHandler.graphqlError("INTERNAL_SERVER",err,"internal server error occured")
          }
     }

     async getClassroom(code:string){
          try{
               const classroom:IClassroom | null = await this.classroomrepository.getClassroom(code);
               if(classroom){
                    return classroom;
               }
               return null
          }catch(err){
               this.errorHandler.graphqlError("INTERNAL_SERVER",err,"internal server error occured")
          }
     }

     async getAllclassroom(id:string){
          try{
             const classroom:IClassroom[]=await this.classroomrepository.getAllClassroom(id)
             return classroom
          }catch(err){
               this.errorHandler.graphqlError("INTERNAL_SERVER",err,"internal server error occured")
          }
     }

     async getCreatorclassroom(id:string){
          try{
             const classroom:IClassroom[]=await this.classroomrepository.getCreatorClassrooms(id)
             return classroom
          }catch(err){
               this.errorHandler.graphqlError("INTERNAL_SERVER",err,"internal server error occured")
          }
     }


}