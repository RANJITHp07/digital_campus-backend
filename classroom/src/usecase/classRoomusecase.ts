import { IClassroom } from "../entities/classroom";
import { ErrorHandler } from "../infrastructure/middleware/error/userErrorhandler";
import { ClassRoomRepository } from "../infrastructure/repository/classroomRepository";
import { RandomNumber } from "../infrastructure/repository/uniqueNumberRepository";
import Publisher from "../infrastructure/repository/publishrepository";
import Listener from "../infrastructure/repository/listenrepository";
import Nodemailer from "../infrastructure/repository/nodemailerRepository";

export class Classroomusecase{
 
     private readonly classroomrepository:ClassRoomRepository
     private readonly randomGenerator: RandomNumber
     private readonly errorHandler:ErrorHandler
     private readonly nodemailer:Nodemailer
     private readonly publish:Publisher
     private readonly listen:Listener

     constructor(classroomrepository:ClassRoomRepository,randomGenerator:RandomNumber,errorHandler:ErrorHandler,publish:Publisher,listen:Listener,nodemailer:Nodemailer) {
         this.classroomrepository = classroomrepository;
         this.randomGenerator = randomGenerator;
         this.errorHandler=errorHandler;
         this.publish=publish;
         this.listen=listen;
         this.nodemailer=nodemailer
     }

     //to create the classroom
     async create(classroom:IClassroom):Promise<unknown>{
        try{
          const code=await this.randomGenerator.generateUniqueRandomCode()
           const newClasroom={...classroom,classCode:code}
            const newclassroom= await this.classroomrepository.create(newClasroom)
            return newclassroom
            
        }catch(err){
          this.errorHandler.apolloError(err)
        }
     }


     //to update the classroom
     async update(id:string,update:Partial<IClassroom>):Promise<unknown>{
          try{
               const updateClassroom=await this.classroomrepository.update(id,update);
               return updateClassroom ? {
                    message:"Sucessfully updated"
               } : this.errorHandler.userInputerror("Wrong clasroom id")
          }catch(err){
                 this.errorHandler.apolloError(err)
          }
     }

     // to delete the existing classroom
     async delete(id:string){
          try{
               const deleteClassroom=await this.classroomrepository.delete(id);
               // if id exist delete or else return an error
               return deleteClassroom ? {
                    message:"Successfully deleted"
               } : this.errorHandler.userInputerror("Wrong clasroom id")
          }catch(err){
               this.errorHandler.apolloError(err)
          }
     }



    //to add a student into
     async addUser(code:string,userId:string,type:boolean):Promise<unknown>{
          try{
              const classroom=await this.classroomrepository.getClassroom(code)
              
              if(classroom?.students_enrolled){
               if(classroom.block){
                    this.errorHandler.graphqlError("The classroom is closed",'')
                   }
              if(type){
                if(classroom.students_enrolled.includes(userId)){
                    //if student is already inside the classroom
                    this.errorHandler.graphqlError("Already inside the classroom",'')
                }else if(classroom.admins.includes(userId)){
                    // if the user is an admin
                    this.errorHandler.graphqlError("Already an admin of this classroom",'')
                }
               classroom.students_enrolled.push(userId);
              }else{
               classroom.students_enrolled = classroom.students_enrolled.filter(studentId => studentId !== userId);
              }
              await this.classroomrepository.create(classroom);
              
           return type ? {
                  message:"Added to the classroom"
              } :
              {
               message:"Removed from the classroom"
              }
          }else{
               //if code does not exist
              this.errorHandler.userInputerror("No such classroom")
          }
          }catch(err){
               this.errorHandler.apolloError(err)
          }
     }

     //to get the classroom details using the code of the classroom
     async getClassroom(code:string){
          try{
               const classroom:IClassroom | null = await this.classroomrepository.getClassroom(code);
               if(classroom){
                    return classroom;
               }
               this.errorHandler.userInputerror("No such code")
          }catch(err){
               this.errorHandler.apolloError(err)
          }
     }

     //to get all the classroom which is created or on which the user is added into
     async getAllclassroom(id:string){
          try{
             const classroom:IClassroom[]=await this.classroomrepository.getAllClassroom(id)
             return classroom
          }catch(err){
               this.errorHandler.apolloError(err)
          }
     }


     //to get all the classroom user has created
     async getCreatorclassroom(id:string){
          try{
             const classroom:IClassroom[]=await this.classroomrepository.getCreatorClassrooms(id)
             return classroom
          }catch(err){
               this.errorHandler.apolloError(err)
          }
     }

     //to get all the participants of the classroom
     async getAllClassroomparticipants(id:string){
          try{
            const classroom=await this.classroomrepository.getAllparticipants(id);
            //to exchange the admin and userId to auth service and collect the data of the users from the auth service
            await this.publish.publish("exchange2","details",{adminId:classroom?.admins, studentId:classroom?.students_enrolled});
          
            const details = await new Promise((resolve) => {
               this.listen.listen("exchange1", "participants", (data) => {
                 resolve(data);
               });
             });
             console.log(details)
             return details
          }catch(err){
               this.errorHandler.apolloError(err)
          }
          }


         //to get the classroom details
          async getClassroomDetail(id:string){
               try{
                    const classroom=await this.classroomrepository.getAllparticipants(id);
                    return classroom
               }catch(err){
                    this.errorHandler.apolloError(err)
               }
          }

          //to get all the classroom details
          async getAllTheClassroom(id:string){
               try{
                   const classroom=await this.classroomrepository.getAllTheClassroom(id)
                   return classroom
               }catch(err){
                    this.errorHandler.apolloError(err)
               }

          }

          //to get all the classroom
          async getclassroom(){
               try{
                 const classroom=await this.classroomrepository.getAllclassroom()
                 return classroom
               }catch(err){
                    this.errorHandler.apolloError(err)
               }
          }

          //to filter out based on the category
          async getFilteredclassroom(id:string,category:string[]){
               try{
                 const classrooms = await this.classroomrepository.classroomFilter(id,category)
                 return classrooms
               }catch(err){
                    this.errorHandler.apolloError(err)
               }
          }

          async addToAdmin(id:string,classroomId:string){
              try{ 
               const classroom=await this.classroomrepository.getClassroom(classroomId)
                 if( classroom && classroom.students_enrolled.includes(id)){
                    classroom.admins.push(id)
                    classroom.students_enrolled = classroom.students_enrolled.filter(studentId => studentId !== id);
                    await this.classroomrepository.create(classroom);
                     return {
                         message:"Successfully added as admin"
                     }
                 }else{
                    this.errorHandler.userInputerror("No such student in the classroom")
                 }
              }catch(err){
              
               this.errorHandler.apolloError(err)
              }
          }

          async removeFromAdmin(id:string,classroomId:string){
               try{
               const classroom=await this.classroomrepository.getClassroom(classroomId)
                 if( classroom && classroom.admins.includes(id)){
                    classroom.students_enrolled.push(id)
                    classroom.admins = classroom.admins.filter(adminId => adminId !== id);
                    await this.classroomrepository.create(classroom);
                     return {
                         message:"Successfully removed from admin"
                     }
                 }else{
                    this.errorHandler.userInputerror("No such  classroom")
                 }
               }catch(err){
                    this.errorHandler.apolloError(err)
               }
          }

          async emailInvitation(fromEmail:string,toEmail: string, username: string,creator:string,code:string){
               try{
                    const emailinvitation=await this.nodemailer.sendEmailInvitation(fromEmail,toEmail,username,creator,code)
                    return {
                         message:emailinvitation
                    }
               }catch(err){
                    this.errorHandler.apolloError(err)
               }
          }
     }





