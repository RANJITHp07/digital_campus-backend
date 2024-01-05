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
    }
}