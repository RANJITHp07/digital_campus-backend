import { IClassroom,} from "../domainLayer/classroom";
import { ErrorHandler } from "../infrastructureLayer/middleware/error/userErrorhandler";
import { ClassRoomRepository } from "../infrastructureLayer/repository/queries/classroomRepository";
import { RandomNumber } from "../infrastructureLayer/repository/services/uniqueNumberRepository";
import Publisher from "../infrastructureLayer/repository/rabbitmq/publishrepository";
import Listener from "../infrastructureLayer/repository/rabbitmq/listenrepository";
import Nodemailer from "../infrastructureLayer/repository/services/nodemailerRepository";
import RequestValidator from "../infrastructureLayer/repository/services/validatorRepository";
import Requester from "../infrastructureLayer/repository/rabbitmq/client";

export class Classroomusecase{
 
     private readonly classroomrepository:ClassRoomRepository
     private readonly randomGenerator: RandomNumber
     private readonly errorHandler:ErrorHandler
     private readonly nodemailer:Nodemailer
     private readonly requestValidator:RequestValidator
     private readonly requester:Requester


     constructor(classroomrepository:ClassRoomRepository,randomGenerator:RandomNumber,errorHandler:ErrorHandler,publish:Publisher,listen:Listener,nodemailer:Nodemailer,requestValidator:RequestValidator,requester:Requester) {
         this.classroomrepository = classroomrepository;
         this.randomGenerator = randomGenerator;
         this.errorHandler=errorHandler;
         this.nodemailer=nodemailer
         this.requestValidator=requestValidator
         this.requester=requester

     }

     //to create the classroom
     async create(classroom:IClassroom):Promise<unknown>{
        try{
        
          const validation = this.requestValidator.validateRequiredFields(
                classroom,
               ['className', 'classSection','classSubject','creator','admins','backgroundPicture','category']
           );
   
           if (!validation.success) {
               this.errorHandler.userInputerror(validation.message as string)
           }
   

          const code=await this.randomGenerator.generateUniqueRandomCode()
           const newClasroom={...classroom,classCode:code}
            const newclassroom= await this.classroomrepository.create(newClasroom)
            return newclassroom
            
        }catch(err){
          this.errorHandler.apolloError(err)
        }
     }


     //to update the classroom
     async update({id,update}:{id:string,update:Partial<IClassroom>}):Promise<unknown>{
          try{
            // Validate required parameters
        const validation = this.requestValidator.validateRequiredFields(
          { id,update },
          ['id', 'update']
      );

      if (!validation.success) {
          this.errorHandler.userInputerror(validation.message as string)
      }
               
               const updateClassroom=await this.classroomrepository.update(id,update);
               return updateClassroom ? {
                    message:"Sucessfully updated"
               } : this.errorHandler.userInputerror("Wrong clasroom id")
          }catch(err){
                 this.errorHandler.apolloError(err)
          }
     }

     // to delete the existing classroom
     async delete({id}:{id:string}){
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
     async addUser({code,userId,type}:{code:string,userId:string,type:boolean}):Promise<unknown>{
 
             // Validate required parameters
        const validation = this.requestValidator.validateRequiredFields(
          { code,userId,type},
          ['code', 'userId','type']
      );

      if (!validation.success) {
          this.errorHandler.userInputerror(validation.message as string)
      }
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
               classroom.request=classroom.request.filter((p)=>p.id!==userId)
              }else{
               classroom.students_enrolled = classroom.students_enrolled.filter((studentId :string)=> studentId !== userId);
              }
              console.log(classroom)
              await this.classroomrepository.update(classroom._id as string, classroom);
              
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
               // console.log(err)
               this.errorHandler.apolloError(err)
          }
     }

     //to add a student into the request
     async addRequest({id,name,code,type}:{id:string,name:string,code:string,type:boolean}){
          try{
               const classroom=await this.classroomrepository.getClassroom(code)
               if(classroom){
                    if(type){
                      // Check if the request already exists based on id and name
                 const requestExists = classroom.request.some((request) => request.id === id && request.name === name);
                 if (!requestExists) {
                    classroom.request.push({ id: id, name: name });
                    await this.classroomrepository.update(classroom._id as string, classroom);
                    return {
                         message: "Inivitation to join send to the admin"
                    }
                  } else {
                    this.errorHandler.userInputerror("Already requested to this classroom");
                  }
                    }else{
                         classroom.request = classroom.request.filter((request) => !(request.id === id && request.name === name));
          await this.classroomrepository.update(classroom._id as string, classroom);
          return {
               message: "Removed the request"
          }
                    }
                    classroom.request.push({ id: id, name: name });
                    
               }else{
                    this.errorHandler.userInputerror("No such classroom")
               }
          }catch(err){
               this.errorHandler.apolloError(err)
          }
     }

     //to get the classroom details using the code of the classroom
     async getClassroom({code}:{code:string}){
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
     async getAllclassroom({id}:{id:string}){
          try{
             const classroom:IClassroom[]=await this.classroomrepository.getAllClassroom(id)
             return classroom
          }catch(err){
               this.errorHandler.apolloError(err)
          }
     }


     //to get all the classroom user has created
     async getCreatorclassroom({id}:{id:string}){
          try{
             const classroom:IClassroom[]=await this.classroomrepository.getCreatorClassrooms(id)
             return classroom
          }catch(err){
               console.log(err)
               this.errorHandler.apolloError(err)
          }
     }

     //to get all the participants of the classroom
     async getAllClassroomparticipants({id}:{id:string}){
          try{
            const classroom=await this.classroomrepository.getAllparticipants(id);
            console.log(classroom)
          const data=await this.requester.publishWithReply('classroomExchange','studentDetails',{adminId:classroom?.admins, studentId:classroom?.students_enrolled})
           return data     
     }catch(err){
               this.errorHandler.apolloError(err)
          }
          }


         //to get the classroom details
          async getClassroomDetail({id}:{id:string}){
               try{
                    const classroom=await this.classroomrepository.getAllparticipants(id);
                    return classroom
               }catch(err){
                    this.errorHandler.apolloError(err)
               }
          }

          //to get all the classroom details
          async getAllTheClassroom({id}:{id:string}){
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
          async getFilteredclassroom({id:userId,category}:{id:string,category:string[]}){
               try{
         // Validate required parameters
        const validation = this.requestValidator.validateRequiredFields(
          { userId,category },
          ['userId', 'category']
      );

      if (!validation.success) {
          this.errorHandler.userInputerror(validation.message as string)
      }
                 const classrooms = await this.classroomrepository.classroomFilter(userId,category)
                 return classrooms
               }catch(err){
                    this.errorHandler.apolloError(err)
               }
          }

          async addToAdmin({id:userId,classroomId}:{id:string,classroomId:string}){
              try{ 

               // Validate required parameters
        const validation = this.requestValidator.validateRequiredFields(
          { userId,classroomId },
          ['userId', 'classroomId']
      );

      if (!validation.success) {
          this.errorHandler.userInputerror(validation.message as string)
      }

               const classroom=await this.classroomrepository.getClassroom(classroomId)
               console.log(classroom)
                 if( classroom && classroom.students_enrolled.includes(userId)){
                    classroom.admins.push(userId)
                    classroom.students_enrolled = classroom.students_enrolled.filter((studentId :string) => studentId !== userId);
                    await this.classroomrepository.update(classroom._id as string, classroom);
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

          async removeFromAdmin({id:userId,classroomId}:{id:string,classroomId:string}){

                  // Validate required parameters
        const validation = this.requestValidator.validateRequiredFields(
          { userId,classroomId },
          ['userId', 'classroomId']
      );

      if (!validation.success) {
          this.errorHandler.userInputerror(validation.message as string)
      }
               try{
               const classroom=await this.classroomrepository.getClassroom(classroomId)
                 if( classroom && classroom.admins.includes(userId)){
                    classroom.students_enrolled.push(userId)
                    classroom.admins = classroom.admins.filter((adminId:string) => adminId !== userId);
                    await this.classroomrepository.update(classroom._id as string, classroom);
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

          async emailInvitation({fromEmail,toEmail,username,creator,code}:{fromEmail:string,toEmail: string, username: string,creator:string,code:string}){
               try{
                    const validation = this.requestValidator.validateRequiredFields(
                         { fromEmail,toEmail,username,creator,code },
                         ['fromEmail','toEmail','username','creator','code']
                     );
               
                     if (!validation.success) {
                         this.errorHandler.userInputerror(validation.message as string)
                     }

                    const emailinvitation=await this.nodemailer.sendEmailInvitation(fromEmail,toEmail,username,creator,code)
                    return {
                         message:emailinvitation
                    }
               }catch(err){
                    this.errorHandler.apolloError(err)
               }
          }

          async getReportedClassroom(){
               try{
                 const reportedClassroom=await this.classroomrepository.getReportedClassrooms();
                 return reportedClassroom
               }catch(err){
                    this.errorHandler.apolloError(err)
               }
          }
     }





