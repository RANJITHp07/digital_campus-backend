import { authenticate } from "@auth-middlewares/common";
import { ISubmission } from "../../../domainLayer/submission"
import controller from "../injection/injection"

interface MyContext {
    user: Request;
  }

export const submissionMutation={
    async createSubmission(_:unknown,args:{submission:ISubmission},context:MyContext){
        try{
            const user=authenticate(context)
            if(user){
           const newSubmission=await controller.createSubmission(_,args)
           return newSubmission
            }
        }catch(err){
            throw err
        }
    },

    async updateGrade(_:unknown,args:{update:{assignment_id: string, userId: string, grade: number}},context:MyContext){
        try{
            const user=authenticate(context)
            if(user){
           const submission=await controller.updateGrade(_,args);
           return submission
            }
        }catch(err){
            console.log(err)
            throw err
        }
    }
}