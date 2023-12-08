import { IClassroom } from "../../entities/classroom"
import { IClassroomReository } from "../../usecase/interface/classroomRepository";
import classroomModel from "../models/classroom"
import { redis } from "../config/redis";


export class ClassRoomRepository implements IClassroomReository{
    
    constructor(private readonly classroom:any) {}

    //to create classroom
    async create(classroom:IClassroom):Promise< IClassroom>{
        try{
            const classRoom=await classroomModel.create(classroom);
            await redis.set(classRoom._id,JSON.stringify(classRoom))
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
        await redis.set(id,JSON.stringify(updatedDocument))
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
        await redis.del(id)
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
          const cachedClassroom=await redis.get(id);
          if(cachedClassroom){
            return JSON.parse(cachedClassroom)
          }
            const classroom=await classroomModel.findById(id);
           //caching the classroom details in redis
          await redis.set(id,JSON.stringify(classroom))
            return classroom
        }catch(err){
          throw err
        }
      }

      //get all the classrooms of a user
      async getAllTheClassroom(id:string){
         try{
          const classroom=await classroomModel.find({
            $or: [
              { admins: id },
              { students_enrolled: id }
            ]
          })
          
          return classroom
         }catch(err){
           throw err
         }
      }

      //to filter the classroom based on the category
       async clasroomFilter(id:string,category:string[]){
              try{
                const classrooms = await classroomModel.find({
                  $and: [
                      { _id: id },  
                      { category: { $in: category } }
                  ]
              });      
                 return classrooms
              }catch(err){
                throw err
              }
       }

      async getAllclassroom(){
        try{
            const classroom=await classroomModel.find().sort({createdAt:-1});
            return classroom
        }catch(err){
          throw err
        }
      }
}

