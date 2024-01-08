import { ISubmission } from "../../../domainLayer/submission"
import controller from "../injection/injection"

export const submissionMutation={
    async createSubmission(_:unknown,args:{submission:ISubmission}){
        try{
           const newSubmission=await controller.createSubmission(_,args)
           return newSubmission
        }catch(err){
            throw err
        }
    },

    async updateGrade(_:unknown,args:{update:{assignment_id: string, userId: string, grade: number}}){
        try{
            
           const submission=await controller.updateGrade(_,args);
           return submission
      
        }catch(err){
            console.log(err)
            throw err
        }
    }
}