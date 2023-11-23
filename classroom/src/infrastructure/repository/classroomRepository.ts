import { IClassroom } from "../../entities/classroom"
import { IClassroomReository } from "../../usecase/interface/classroomRepository";
import classroomModel from "../models/classroom"


export class ClassRoomRepository implements IClassroomReository{
    
    constructor(private readonly classroom:any) {}

    //to create classroom
    async create(classroom:IClassroom):Promise< IClassroom>{
        try{
            const classRoom=await classroomModel.create(classroom);
            return classRoom
        }catch(err){
            throw err
        }
    }

    //to update the classroom using the id
    async update(id: string, update: Partial<IClassroom>): Promise<boolean> {
      try {
        const updatedDocument = await classroomModel.findByIdAndUpdate(id, { $set: update }, { new: true });
    
        if (!updatedDocument) {
          return false
        }
    
        return true
      } catch (err) {
        throw err;
      }
    }
    

    //to delete the classroom using id
    async delete(id: string): Promise<boolean> {
      try {
        const deletedDocument = await classroomModel.findByIdAndDelete(id);
        
        if (!deletedDocument) {
          return false
        }
    
        return  true
      } catch (err) {
        throw err;
      }
    }
    

    //to get the classroom using
    async getClassroom(code:string):Promise<IClassroom | null>{
        try{ 
        let classroom = await classroomModel.findOne({classCode:code})
          return classroom
        }catch(err){
            throw err
        }
    }

    //to get the classroom of a particular user
    async getAllClassroom(code:string):Promise<IClassroom[]>{
        try{ 
        let classroom = await classroomModel.find({students_enrolled:code})
          return classroom
        }catch(err){
            throw err
        }
    }

    //to get the classroom creator
    async  getCreatorClassrooms(id:string):Promise<IClassroom[]> {
        try {
          const classrooms:IClassroom[] = await classroomModel.aggregate([
            {
              $match: {
                $expr: { $eq: [{ $arrayElemAt: ['$admins', 0] }, id] } // to comapre the 0th index id and argument id to find who created the class.Because the first element in the array will be the person who created the classroom
              } 
            }
          ]);
          return classrooms;
        } catch (err) {
          throw err
        }
      }

      async getAllparticipants(id:string):Promise<IClassroom | null>{
        try{
            const classroom=await classroomModel.findById(id);
            return classroom
        }catch(err){
          throw err
        }
      }
}

