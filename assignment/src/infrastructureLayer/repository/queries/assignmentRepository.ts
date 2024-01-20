import Assignment, {IAssignmentModel } from "../../model/assignment";
import { IAssigmentRepository } from "../../../usecaseLayer/interface/assignmentRepository";
import { IAssignment } from "../../../domainLayer/assignment";
import { Model, Types } from "mongoose";
import { createAssignment, deleteAssignment, distinctTopic, findAssignments, getAllassignments, getOneAssignment, groupedAssignment } from "./assignment/index";
import { updateAssignment } from "./assignment/updateAssignment";


export class AssignmentRepository implements IAssigmentRepository{
   constructor(private readonly assignmentModel: Model<IAssignmentModel>){} 


    //to create the assignments 
    async create(assignment:IAssignment):Promise<IAssignmentModel>{
       return createAssignment(this.assignmentModel, assignment)
    }

    //to get all the assignments of a classroom
    async getAllassignments(id:string):Promise<IAssignmentModel[]>{
       return getAllassignments(this.assignmentModel,new Types.ObjectId(id))
    }
    
    //to get the details of a single classroom
    async getOneAssignment(id:string):Promise<IAssignmentModel | null>{
        return getOneAssignment(this.assignmentModel,new Types.ObjectId(id))
    }

    //to get the assignment in groups
    async groupedAssignment(id: string): Promise<Array<{ _id: string | null, assignments: IAssignmentModel[] }>>{
      return groupedAssignment(this.assignmentModel,new Types.ObjectId(id))
    }
    

      //to get the details of the mainTopic
      async distinctTopic(id:string):Promise<string[]>{
         return distinctTopic(this.assignmentModel,new Types.ObjectId(id))
      }

      //to delete assignment
      async deleteAssignment(id:string):Promise<IAssignmentModel | null>{
        return deleteAssignment(this.assignmentModel,new Types.ObjectId(id))
      }
 
      //to update the assignments
      async update(id:string,update:Partial<IAssignment>):Promise<IAssignmentModel | null>{
         return updateAssignment(this.assignmentModel,new Types.ObjectId(id),update)
      }
      

      //to get all the assignment and due_date
      async findAssignments(id: string):Promise<IAssignmentModel[]> {
        return findAssignments(this.assignmentModel,id)
      }
      
    
}
