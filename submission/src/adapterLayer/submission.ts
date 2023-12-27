import { NextFunction,Request,Response } from "express"
import submissionModel from "../infrastructureLayer/model/submission"
import { Assignment } from "../infrastructureLayer/respository/assignment"

export class Submission{
    async Polling(req:Request,res:Response,next:NextFunction){
        try{
            const assignment=new Assignment()
            if(req.body.pollingAnswers){
                await submissionModel.create(req.body)
                const a=await assignment.find(req.body.assignment_id)
                if(a){
                    a.polling.answers.indexOf(req.body.pollingAnswers);
                    
                }
                

            }

        }catch(err){
            throw err
        }
    }
}