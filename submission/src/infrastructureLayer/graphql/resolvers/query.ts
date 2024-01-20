import { authenticate } from "@auth-middlewares/common";
import controller from "../injection/injection"


interface MyContext {
  user: Request;
}

export const submissionQuery={
    async getAllSubmission(_:unknown,args:{id:string},context:MyContext){
      try{
        const user=authenticate(context)
        if(user){
       const submission=await controller.getAllSubmission(_,args);
       return submission
        }
      }catch(err){
        throw err
      }
    },

    async getPolling(_:unknown,args:{id:string},context:MyContext){
        try{
          const user=authenticate(context)
          if(user){
         const submission=await controller.getAssignment(_,args)
         return submission
          }
        }catch(err){
            throw err
        }
    }


}