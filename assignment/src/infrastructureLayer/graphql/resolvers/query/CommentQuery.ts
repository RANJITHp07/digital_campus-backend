import { controller, errorHandler } from "../../injection/comment"

export const commentQuery={
   async getAllComments(_:unknown,args:{id:string}){
     try{
        const comments=await controller.getAllComments(_,args)
        return comments
     }catch(err){
        errorHandler.apolloError(err)
     }
   }

}