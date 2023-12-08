import { IClassroom } from "../entities/classroom";
import { ErrorHandler } from "../infrastructure/middleware/error/userErrorhandler";
import { Classroomusecase } from "../usecase/classRoomusecase";


export class ClassroomController{

    private readonly classroomusecase:Classroomusecase
    private readonly errorHandler:ErrorHandler
    constructor(classroomusecase:Classroomusecase,errorHandler:ErrorHandler){
        this.classroomusecase=classroomusecase;
        this.errorHandler=errorHandler;
    }

    async createClass(_:unknown,args:{classroom: IClassroom}):Promise<unknown>{
        try{
            const newClassroom=await this.classroomusecase.create(args.classroom)
            return newClassroom
        }catch(err){
            this.errorHandler.apolloError(err)
        }
    }

    async updateClass(_:unknown,args:{id:string,update:Partial<IClassroom>}){
        try{
           const updatedClassroom = await this.classroomusecase.update(args.id,args.update)
           return updatedClassroom
        }catch(err){
            this.errorHandler.apolloError(err)
        }
    }

    async deleteClass(_:unknown,args:{id:string}):Promise<unknown>{
        try{
            const deletedClass=await this.classroomusecase.delete(args.id)
            return deletedClass
        }catch(err){
            this.errorHandler.apolloError(err)
        }
    }

    async getClass(_:unknown,args:{code:string}){
        try{
            const classroom=await this.classroomusecase.getClassroom(args.code)
             return classroom
        }catch(err){
            this.errorHandler.apolloError(err)
        }
    }

    async addStudent(_:unknown,args:{addstudent:{code:string,userId:string}}){
        try{
            const {code ,userId}=args.addstudent
            const adduser=await this.classroomusecase.addUser(code,userId,true)
            return adduser
        }catch(err){
            this.errorHandler.apolloError(err)
        }
    }

    async deleteStudent(_:unknown,args:{deletedstudent:{code:string,userId:string}}){
        try{
            const {code ,userId}=args.deletedstudent
            const deletedStudent=await this.classroomusecase.addUser(code,userId,false)
            return deletedStudent
        }catch(err){
            this.errorHandler.apolloError(err)
        }
    }


    async getAllClassroom(_:unknown,args:{id:string}){
        try{
           const classrooms=await this.classroomusecase.getAllclassroom(args.id)
           return classrooms
        }catch(err){
            this.errorHandler.apolloError(err)
        }
    }

   async getCreatorClassroom(_:unknown,args:{id:string}){
    try{
        const classrooms=await this.classroomusecase.getCreatorclassroom(args.id)
        return classrooms
    }catch(err){
        this.errorHandler.apolloError(err)
    }
   }

   async getAllparticipants(_:unknown,args:{id:string}){
    try{
        const classrooms=await this.classroomusecase.getAllClassroomparticipants(args.id)
        return classrooms
    }catch(err){
        this.errorHandler.apolloError(err)
    }
   }

   async getClassroomDetails(_:unknown,args:{id:string}){
      try{
          const classroom = await this.classroomusecase.getClassroomDetail(args.id);
          return classroom
      }catch(err){
        this.errorHandler.apolloError(err)
      }
   }

   async getAllTheClasroom(_:unknown,args:{id:string}){
    try{
        const classroom = await this.classroomusecase.getAllTheClassroom(args.id);
        return classroom
    }catch(err){
      this.errorHandler.apolloError(err)
    }
 }

   async getclassroom(_:unknown,args:unknown){
      try{
           const classroom=await this.classroomusecase.getclassroom()
           return classroom
      }catch(err){
        this.errorHandler.apolloError(err)
      }
   }

   async getFilteredclassroom(_:unknown,args:{id:string,category:string[]}){
      try{
         const classrooms=await this.classroomusecase.getFilteredclassroom(args.id,args.category)
         return classrooms
      }catch(err){
        this.errorHandler.apolloError(err)
      }
   }

   async addToAdmin(_:unknown,args:{id:string,classroomId:string}){
    try{
        const addedAdmin=await this.classroomusecase.addToAdmin(args.id,args.classroomId)
        return addedAdmin
    }catch(err){
        this.errorHandler.apolloError(err)
    }
   }

   async removeFromAdmin(_:unknown,args:{id:string,classroomId:string}){
    try{
        const addedAdmin=await this.classroomusecase.removeFromAdmin(args.id,args.classroomId)
        return addedAdmin
    }catch(err){
        this.errorHandler.apolloError(err)
    }
   }

   async emailInviation(_:unknown,args:{invitation:{
    fromEmail:string,toEmail: string, username: string,creator:string,code:string}}){
        try{
            const {fromEmail,toEmail,username,creator,code}=args.invitation
            const inivitation=await this.classroomusecase.emailInvitation(fromEmail,toEmail,username,creator,code)
            return inivitation
            
        }catch(err){
            this.errorHandler.apolloError(err)
        }
    }
    
}