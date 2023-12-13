import { Types } from "mongoose";
import { IAssigment } from "../../entites/assignment";
import Assignment from "../model/assignment";

export interface IAssignmentWithId extends IAssigment {
    _id: Types.ObjectId;
}

export class AssignmentRepository{

    //to create the assignments 
    async create(assignment:IAssigment):Promise<IAssignmentWithId>{
        try{
          const newAssignment=await Assignment.create(assignment)
          return newAssignment
        }catch(err){
            throw err
        }
    }

    //to get all the assignments of a classroom
    async getAllassignments(id:string){
        try{
            const assignments=await Assignment.find({class_id:id}).sort({createdAt:-1})
            return assignments
        }catch(err){
            throw err
        }
    }
    
    //to get the details of a single classroom
    async getOneAssignment(id:string){
        try{
            const assignments=await Assignment.findById(id)
            return assignments
        }catch(err){
            throw err
        }
    }

    //to get the assignment in groups
    async groupedAssignment(id: string) {
        const assignment = await Assignment.aggregate([
          {
            $match: {
              class_id: { $in: [id] },
            },
          },
          {
            $group: {
              _id: {
                $ifNull: ["$mainTopic", null],
              },
              assignments: { $push: "$$ROOT" },
            },
          },
          {
            $sort: {
              _id: 1, 
            },
          },
        ]);
      
        return assignment;
      }


      //to get the details of the mainTopic
      async distinctTopic(){
        try{
            const distinctMainTopics = await Assignment.distinct('mainTopic');
            return distinctMainTopics
        }catch(err){
            throw err
        }
      }

      //to delete assignment
      async deleteAssignment(id:string){
        try{
           const deletedAssignment=await Assignment.findByIdAndDelete(id)
           
           return  deletedAssignment
        }catch(err){
          throw err
        }
      }
 
      //to update the assignments
      async update(id:string,update:Partial<IAssigment>){
        try{
          const updateAssignment=await Assignment.findByIdAndUpdate(id,{$set:update})
          return  updateAssignment
       }catch(err){
         throw err
       }
      }

      //to get all the assignment and due_date
      async findAssignments(id: string) {
        try {
          const assignments = await Assignment.find({
            $and: [
              { dueDate: { $exists: true } },
              { students: id}
            ]
          });
          return assignments;
        } catch (err) {
          throw err;
        }
      }
      
    
}