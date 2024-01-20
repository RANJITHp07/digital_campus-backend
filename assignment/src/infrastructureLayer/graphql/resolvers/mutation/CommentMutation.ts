import { authenticate } from "@auth-middlewares/common";
import { IComment, IReply } from "../../../../domainLayer/comments";
import { errorHandler,controller } from "../../injection/comment";
import {Request} from 'express'

interface MyContext {
  user: Request;
}


export const commentMutation={
   async createComment(_:unknown,args:{comment:IComment},context:MyContext){
     try{
      const user=authenticate(context)
            if(user){
        const newComment=await controller.createComment(_,args)
        return newComment
            }
     }catch(err){
        errorHandler.apolloError(err)
     }
    },

    async deleteComment(_:unknown,args:{id:string},context:MyContext){
         try{
            const user=authenticate(context)
            if(user){
            const deletedComment=await controller.deleteComment(_,args)
            return deletedComment;
            }
         }catch(err){
            errorHandler.apolloError(err)
         }
    },

    async deleteReply(_:unknown,args:{id:string,reply:IReply},context:MyContext){
        try{
         const user=authenticate(context)
         if(user){
          const deletedReply=await controller.deleteReply(_,args)
          return deletedReply
         }
        }catch(err){
         errorHandler.apolloError(err)
        }
    },

    async updateReply(_:unknown,args:{id:string,reply:IReply},context:MyContext){
      try{
         const user=authenticate(context)
         if(user){
        const updatedReply=await controller.deleteReply(_,args)
        return updatedReply
         }
      }catch(err){
       errorHandler.apolloError(err)
      }
  }


}