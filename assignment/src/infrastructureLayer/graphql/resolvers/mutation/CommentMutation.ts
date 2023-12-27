import { IComment } from "../../../../domainLayer/comments";


export const commentMutation={
   async createComment(_:unknown,args:{comment:IComment}){
     try{

     }catch(err){
        errorHandler.apolloError(err)
     }
    }

}