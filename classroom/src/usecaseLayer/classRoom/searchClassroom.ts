import { IClassroom } from "../../domainLayer/classroom";
import { IClassroomRepository } from "../interface/classroomRepository";

export const searchClassroom=async(classroomRepository: IClassroomRepository,page:number,text:string):Promise<IClassroom[]>=>{
   try{
      const classrooms=await classroomRepository.findSearchedClassroom(page,10,text);
      return classrooms
   }catch(err){
    throw err
   }
}