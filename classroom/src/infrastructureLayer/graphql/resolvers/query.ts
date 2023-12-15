import { errorHandler,controller } from "../injection/injection"

export const classroomQueries={
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
}