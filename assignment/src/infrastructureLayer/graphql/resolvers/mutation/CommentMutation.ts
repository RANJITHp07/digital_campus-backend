import { IComment } from "../../../../domainLayer/comments";
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


}