import { IComment, IReply } from "../../../../domainLayer/comments";
import { errorHandler,controller } from "../../injection/comment";


export const commentMutation={
   async createComment(_:unknown,args:{comment:IComment}){
     try{
        const newComment=await controller.createComment(_,args)
        return newComment
     }catch(err){
        errorHandler.apolloError(err)
     }
    },

    async deleteComment(_:unknown,args:{id:string}){
         try{
            const deletedComment=await controller.deleteComment(_,args)
            return deletedComment;
         }catch(err){
            errorHandler.apolloError(err)
         }
    },

    async deleteReply(_:unknown,args:{id:string,reply:IReply}){
        try{
          const deletedReply=await controller.deleteReply(_,args)
          return deletedReply
        }catch(err){
         errorHandler.apolloError(err)
        }
    },

    async updateReply(_:unknown,args:{id:string,reply:IReply}){
      try{
        const updatedReply=await controller.deleteReply(_,args)
        return updatedReply
      }catch(err){
       errorHandler.apolloError(err)
      }
  }


}