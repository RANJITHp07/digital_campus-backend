import { Model, Types } from "mongoose";
import { ISubmission } from "../../../domainLayer/submission";
import { ISubmissionRepository } from "../../../usecaseLayer/interface/submission";
import { ISubmissionModel } from "../../model/submission";
import { createSubmission, findAllSubmission, findSubmission, updateSubmission,updateGrade } from "./submission/index";

export class SubmissionRepository implements ISubmissionRepository{

    constructor(private readonly submissionModel:Model<ISubmissionModel>){}

    //to create the submission
    async create(submission:ISubmission):Promise<string>{
       return createSubmission(this.submissionModel,submission)
    }

    //to update the the submission
    async update({id,update}:{id:string,update:any}):Promise<boolean>{
        return updateSubmission(this.submissionModel,new Types.ObjectId(id),update);
    }

    //to find a particular submission
    async find(id:string,userId:string):Promise<ISubmissionModel | null>{
       return findSubmission(this.submissionModel,new Types.ObjectId(id),userId)
    }

    //to find all the submissions
    async findAll(id:string):Promise<ISubmissionModel[]>{
       return findAllSubmission(this.submissionModel,new Types.ObjectId(id))
    }

    //to update the grade of the submitted students
    async updateGrade(assignmentId: string, userId: string, newGrade: number):Promise<boolean>{
        return updateGrade(this.submissionModel,new Types.ObjectId(assignmentId),userId,newGrade)
      };
}