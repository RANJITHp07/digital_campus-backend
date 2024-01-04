import Assignment, {IAssignmentModel } from "../../model/assignment";
import { IAssigmentRepository } from "../../../usecaseLayer/interface/assignmentRepository";
import { IAssigment } from "../../../domainLayer/assignment";
import { redis } from "../../config/redis";



export class AssignmentRepository implements IAssigmentRepository{
    //to create the assignments 
    async create(assignment:IAssigment):Promise<IAssignmentModel>{
        try{
          const newAssignment=await Assignment.create(assignment)as IAssignmentModel;
          return newAssignment
        }catch(err){
            throw err
        }
    }

    //to get all the assignments of a classroom
    async getAllassignments(id:string):Promise<IAssignmentModel[]>{
        try{
            const assignments=await Assignment.find({class_id:id}).sort({createdAt:-1})as IAssignmentModel[]
            return assignments
        }catch(err){
            throw err
        }
    }
    
    //to get the details of a single classroom
    async getOneAssignment(id:string):Promise<IAssignmentModel | null>{
        try{

            const cachedAssignment=await redis.get(id);
            if(cachedAssignment){
              return JSON.parse(cachedAssignment)
            }

            const assignment=await Assignment.findById(id)as IAssignmentModel | null
            if(assignment){
              await redis.set(assignment._id,JSON.stringify(assignment))
              await redis.expire(assignment._id, 3600);
            }
            return assignment
        }catch(err){
            throw err
        }
    }

    //to get the assignment in groups
    async groupedAssignment(id: string):Promise<unknown> {
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
      async distinctTopic():Promise<string[]>{
        try{
            const distinctMainTopics = await Assignment.distinct('mainTopic');
            return distinctMainTopics
        }catch(err){
            throw err
        }
      }

      //to delete assignment
      async deleteAssignment(id:string):Promise<IAssignmentModel | null>{
        try{
           const deletedAssignment=await Assignment.findByIdAndDelete(id)
           if (deletedAssignment instanceof Assignment && deletedAssignment !== null) {
            
            //deleting the cached assignment
            redis.del(deletedAssignment._id)
            return deletedAssignment as IAssignmentModel;
          } else {
            return null;
          }
        }catch(err){
          throw err
        }
      }
 
      //to update the assignments
      async update(id:string,update:Partial<IAssigment>):Promise<IAssignmentModel | null>{
        try{
          const updateAssignment=await Assignment.findByIdAndUpdate(id,{$set:update})as IAssignmentModel
          if (updateAssignment && updateAssignment instanceof Assignment) {
            
            //caching the updated assignment
            redis.set(updateAssignment._id,JSON.stringify(updateAssignment))
            await redis.expire(updateAssignment._id, 3600);

            return updateAssignment as IAssignmentModel;
          } else {
            return null;
          }
       }catch(err){
         throw err
       }
      }
      

      //to get all the assignment and due_date
      async findAssignments(id: string):Promise<IAssignmentModel[]> {
        try {
          const assignments = await Assignment.find({
            $and: [
              { dueDate: { $exists: true } },
              { students: id}
            ]
          })as IAssignmentModel[];
          return assignments;
        } catch (err) {
          throw err;
        }
      }
      
    
}
