import controller from "../injection/injection"

export const submissionQuery={
    async getAllSubmission(_:unknown,args:{id:string}){
      try{
       const submission=await controller.getAllSubmission(_,args);
       return submission
      }catch(err){
        throw err
      }
    },

    async getPolling(_:unknown,args:{id:string}){
        try{
         const submission=await controller.getPolling(_,args)
         return submission
        }catch(err){
            throw err
        }
    }


}