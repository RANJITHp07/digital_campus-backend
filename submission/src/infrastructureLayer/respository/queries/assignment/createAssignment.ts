import { Model } from "mongoose"
import { IAssignment } from "../../../../domainLayer/assignment"
import { IAssignmentModel } from "../../../model/assignment"

export const createAssignment=async(assignmentModel:Model<IAssignmentModel>,assignment:IAssignment):Promise<string>=>{
    try{
       await assignmentModel.create(assignment)
       return 'assignment created'
    }catch(err){
        throw err
    }
}