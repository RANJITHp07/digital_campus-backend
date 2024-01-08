import { ISubmission } from "../../domainLayer/submission";
import { ISubmissionRepository } from "../../usecaseLayer/interface/submission";
import submissionModel from "../model/submission";

export class SubmissionRepository implements ISubmissionRepository{

    async create(submission:ISubmission):Promise<string>{
        try{
           await submissionModel.create(submission);
           return 'successfully submitted'
        }catch(err){
     
            throw err
        }
    }

    async update({id,update}:{id:string,update:any}):Promise<boolean>{
        try{
           const updatedSubmission=await submissionModel.findByIdAndUpdate(id,{$set:update})
           if(updatedSubmission){
            return true
           }
           return false
        }catch(err){
            throw err
        }
    }

    async find(id:string,userId:string){
       try{
           const findAssignment=await submissionModel.findOne({assignment_id:id,user_id:userId})
           return findAssignment
       }catch(err){
        throw err
       }
    }

    async findAll(id:string){
        try{
            const findAssignment=await submissionModel.find({assignment_id:id})
            return findAssignment
        }catch(err){
            throw err
        }
    }

    async updateGrade(assignmentId: string, userId: string, newGrade: number){
        try {
            console.log(assignmentId,userId)
          const filter = { assignment_id: assignmentId, user_id: userId };
          const update = { 'submission.grade': newGrade };
      
          
          const result = await submissionModel.findOneAndUpdate(filter, {$set:update});
         console.log(result)
          if (result) {
            return true
          }
          return false
        } catch (err) {
          throw err
        }
      };
}