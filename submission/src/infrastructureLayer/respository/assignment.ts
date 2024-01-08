import { IAssignment } from "../../domainLayer/assignment"
import { IAssignmentRepository } from "../../usecaseLayer/interface/assignment"
import AssignmentModel, { IAssignmentModel } from "../model/assignment"

export class AssignmentRepository implements IAssignmentRepository{

    async create(assignment:any):Promise<string>{
        try{
           await AssignmentModel.create(assignment)
           return 'assignment created'
        }catch(err){
            throw err
        }
    }

    async update(id:string,update:Partial<IAssignment>):Promise<string | null>{
        try{
           const updateAssignment=await AssignmentModel.findByIdAndUpdate(id,{$set:update})
           return updateAssignment ? 'assignment updated' :  null
           
        }catch(err){
            throw err
        }
    }

    async delete(id:string){
        try{
            const deleteAssignment=await AssignmentModel.findByIdAndDelete(id)
            return deleteAssignment ? 'assignment deleted' : null
        }catch(err){
            throw err
        }
    }

    async findAssignment(id:string):Promise<IAssignmentModel | null>{
        try{
           const assignment= await AssignmentModel.findById(id)
           return assignment
        }catch(err){
            throw err
        }
    }
}