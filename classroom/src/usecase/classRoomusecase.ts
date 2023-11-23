import { IClassroom } from "../entities/classroom";
import { ErrorHandler } from "../infrastructure/middleware/error/userErrorhandler";
import { ClassRoomRepository } from "../infrastructure/repository/classroomRepository";
import { RandomNumber } from "../infrastructure/repository/uniqueNumberRepository";
import Publisher from "../infrastructure/repository/publishrepository";
import Listener from "../infrastructure/repository/listenrepository";

export class Classroomusecase{
 
     private readonly classroomrepository:ClassRoomRepository
     private readonly randomGenerator: RandomNumber
     private readonly errorHandler:ErrorHandler
     private readonly publish:Publisher
     private readonly listen:Listener

     constructor(classroomrepository:ClassRoomRepository,randomGenerator:RandomNumber,errorHandler:ErrorHandler,publish:Publisher,listen:Listener) {
         this.classroomrepository = classroomrepository;
         this.randomGenerator = randomGenerator;
         this.errorHandler=errorHandler;
         this.publish=publish;
         this.listen=listen;
     }

     //to create the classroom
     async create(classroom:IClassroom):Promise<unknown>{
        try{
          const code=await this.randomGenerator.generateUniqueRandomCode()
           const newClasroom={...classroom,classCode:code}
            const newclassroom= await this.classroomrepository.create(newClasroom)

          //   await this.publish.publish("")
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
              if(type){
                if(classroom.students_enrolled.includes(userId)){
                    //if student is already inside the classroom
                    this.errorHandler.graphqlError("Already inside the classroom",'')
                }
               classroom.students_enrolled.push(userId);
              }else{
               classroom.students_enrolled = classroom.students_enrolled.filter(studentId => studentId !== userId);
              }
              let adduser=await this.classroomrepository.create(classroom);

              // publishing the added student into the assignment service
              await this.publish.publish("exchange4","addStudentrouting",{id:adduser._id,admin:adduser.admins,student_enrollment:adduser.students_enrolled})
              
              return {
                  message:"Added to the classroom"
              }
          }else{
               //if code does not exist
              this.errorHandler.userInputerror("No such classroom")
          }
          }catch(err){
               this.errorHandler.apolloError(err)
          }
     }

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

     async getAllclassroom(id:string){
          try{
             const classroom:IClassroom[]=await this.classroomrepository.getAllClassroom(id)
             return classroom
          }catch(err){
               this.errorHandler.apolloError(err)
          }
     }

     async getCreatorclassroom(id:string){
          try{
             const classroom:IClassroom[]=await this.classroomrepository.getCreatorClassrooms(id)
             return classroom
          }catch(err){
               this.errorHandler.apolloError(err)
          }
     }

     async getAllClassroomparticipants(id:string){
          try{
            const classroom=await this.classroomrepository.getAllparticipants(id);
            await this.publish.publish("exchange4","details",{adminId:classroom?.admins, studentId:classroom?.students_enrolled});
            const details = await new Promise((resolve) => {
               this.listen.listen("exchange7", "Jobs", (data) => {
                    console.log(data)
                 const mergedData:any =[]
               
                 resolve(mergedData);
               });
             });
          }catch(err){
               this.errorHandler.apolloError(err)
          }
          }

          async getClassroomDetail(id:string){
               try{
                    const classroom=await this.classroomrepository.getAllparticipants(id);
                    return classroom
               }catch(err){
                    this.errorHandler.apolloError(err)
               }
          }
     }



