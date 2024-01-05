import { IClassroom } from "../domainLayer/classroom";
import { ErrorHandler } from "../infrastructureLayer/middleware/error/userErrorhandler";
import { Classroomusecase } from "../usecaseLayer/classRoomusecase";


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
           const updatedClassroom = await this.classroomusecase.update(args)
           return updatedClassroom
        }catch(err){
            this.errorHandler.apolloError(err)
        }
    }

    async deleteClass(_:unknown,args:{id:string}):Promise<unknown>{
        try{
            const deletedClass=await this.classroomusecase.delete(args)
            return deletedClass
        }catch(err){
            this.errorHandler.apolloError(err)
        }
    }

    async getClass(_:unknown,args:{code:string}){
        try{
            const classroom=await this.classroomusecase.getClassroom(args)
             return classroom
        }catch(err){
            this.errorHandler.apolloError(err)
        }
    }

    async addStudent(_:unknown,args:{addstudent:{code:string,userId:string}}){
        try{
            const adduser=await this.classroomusecase.addUser({...args.addstudent,type:true});
            return adduser
        }catch(err){
            this.errorHandler.apolloError(err)
        }
    }

    async deleteStudent(_:unknown,args:{deletedstudent:{code:string,userId:string}}){
        try{
            const deletedStudent=await this.classroomusecase.addUser({...args.deletedstudent,type:false})
            return deletedStudent
        }catch(err){
            this.errorHandler.apolloError(err)
        }
    }

    async reportedClassroom(_:unknown,args:unknown){
        try{
            const deletedStudent=await this.classroomusecase.getReportedClassroom()
            return deletedStudent
        }catch(err){
            this.errorHandler.apolloError(err)
        }
    }


    async getAllClassroom(_:unknown,args:{id:string}){
        try{
           const classrooms=await this.classroomusecase.getAllclassroom(args)
           return classrooms
        }catch(err){
            this.errorHandler.apolloError(err)
        }
    }

   async getCreatorClassroom(_:unknown,args:{id:string}){
    try{
        const classrooms=await this.classroomusecase.getCreatorclassroom(args)
        return classrooms
    }catch(err){
        this.errorHandler.apolloError(err)
    }
   }

   async getAllparticipants(_:unknown,args:{id:string}){
    try{
        const classrooms=await this.classroomusecase.getAllClassroomparticipants(args)
        return classrooms
    }catch(err){
        this.errorHandler.apolloError(err)
    }
   }

   async getClassroomDetails(_:unknown,args:{id:string}){
      try{
          const classroom = await this.classroomusecase.getClassroomDetail(args);
          return classroom
      }catch(err){
        this.errorHandler.apolloError(err)
      }
   }

   async getAllTheClasroom(_:unknown,args:{id:string}){
    try{
        const classroom = await this.classroomusecase.getAllTheClassroom(args);
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
         const classrooms=await this.classroomusecase.getFilteredclassroom(args)
         return classrooms
      }catch(err){
        this.errorHandler.apolloError(err)
      }
   }

   async addToAdmin(_:unknown,args:{id:string,classroomId:string}){
    try{
        const addedAdmin=await this.classroomusecase.addToAdmin(args)
        return addedAdmin
    }catch(err){
        this.errorHandler.apolloError(err)
    }
   }

   async removeFromAdmin(_:unknown,args:{id:string,classroomId:string}){
    try{
        const addedAdmin=await this.classroomusecase.removeFromAdmin(args)
        return addedAdmin
    }catch(err){
        this.errorHandler.apolloError(err)
    }
   }

   async emailInviation(_:unknown,args:{invitation:{
    fromEmail:string,toEmail: string, username: string,creator:string,code:string}}){
        try{
            const inivitation=await this.classroomusecase.emailInvitation(args.invitation)
            return inivitation
            
        }catch(err){
            this.errorHandler.apolloError(err)
        }
    }

    async addRequest(_:unknown,args:{request:{id:string,name:string,code:string,email:string}}){
        try{
         const addUserRequest=await this.classroomusecase.addRequest({...args.request,type:true})
         return addUserRequest
        }catch(err){
            this.errorHandler.apolloError(err)
        }
    }

    async removeRequest(_:unknown,args:{request:{id:string,name:string,code:string,email:string}}){
        try{
            const removeUserRequest=await this.classroomusecase.addRequest({...args.request,type:false})
            return removeUserRequest
           }catch(err){
               this.errorHandler.apolloError(err)
           }
    }
    
}