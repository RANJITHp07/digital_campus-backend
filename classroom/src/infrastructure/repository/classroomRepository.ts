import { IClassroom } from "../../entities/classroom"
import { IClassroomReository } from "../../usecase/interface/classroomRepository";
import classroomModel from "../models/classroom"


export class ClassRoomRepository implements IClassroomReository{
    
    constructor(private readonly classroom:any) {}

    //to create classroom
    async create(classroom:IClassroom):Promise<string>{
        try{
            const res=await classroomModel.create(classroom);
            return "Classroom has been created"
        }catch(err){
            console.log(err)
            throw err
        }
    }

    //to update the classroom using the id
    async update(id:string,update:Partial<IClassroom>):Promise<string>{
        try{
             await classroomModel.findByIdAndUpdate(id,{$set:update})
             return "successfully updated"
        }catch(err){
            throw err
        }
    }

    //to delete the classroom using id
    async delete(id:string):Promise<string>{
       try{
          await classroomModel.findByIdAndDelete(id)
          return "successfully deleted"
       }catch(err){
        throw err
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
                $expr: { $eq: [{ $arrayElemAt: ['$admins', 0] }, id] } // to comapre the 0th index id and argument id to find who created the class
                                                                       //Because the first element in the array will be the person who created the classroom
              } 
            }
          ]);
          return classrooms;
        } catch (err) {
          throw err
        }
      }
}