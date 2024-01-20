import { Model, Types } from "mongoose"
import { IAssignment } from "../../../domainLayer/assignment"
import { IAssignmentRepository } from "../../../usecaseLayer/interface/assignment"
import  { IAssignmentModel } from "../../model/assignment"
import { createAssignment, updateAssignment,deleteAssignment,findAssignment } from "./assignment/index"

export class AssignmentRepository implements IAssignmentRepository{

    constructor(private readonly assignmentModel:Model<IAssignmentModel>){}

    async create(assignment:IAssignment):Promise<string>{
        return createAssignment(this.assignmentModel,assignment);
    }

    async update(id:string,update:Partial<IAssignment>):Promise<string | null>{
        return updateAssignment(this.assignmentModel,new Types.ObjectId(id),update)
    }

    async delete(id:string):Promise<string | null>{
        return deleteAssignment(this.assignmentModel,new Types.ObjectId(id))
    }

    async findAssignment(id:string):Promise<IAssignmentModel | null>{
        return findAssignment(this.assignmentModel,new Types.ObjectId(id))
    }
}