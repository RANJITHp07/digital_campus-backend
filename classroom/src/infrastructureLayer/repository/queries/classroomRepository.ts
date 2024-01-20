import { IClassroom } from "../../../domainLayer/classroom";
import { IClassroomRepository } from "../../../usecaseLayer/interface/classroomRepository";
import { IClassroomModel } from "../../models/classroom";
import { Model } from "mongoose";
import {
  createClassroom,
  getCreatorClassrooms,
  findAllClassrooms,
  findAllparticipants,
  getReportedClassrooms,
  findSearchedClassroom,
  deleteClassroom,
  updateClassroom,
  updateProfile,
  classroomFilter,
  getAllTheClassroom,
  findClassroom,
  findAllUsersClassroom
} from './classRoom/index';
import { Types } from "mongoose";


export class ClassRoomRepository implements IClassroomRepository {
  constructor(private readonly classroomModel:Model<IClassroomModel>) {}

  //to create classroom
  async create(classroom: IClassroom): Promise<IClassroom> {
    return createClassroom(this.classroomModel,classroom)
  }

  //to update the classroom using the id
  async update(id: string, update: Partial<IClassroom>): Promise<boolean> {
    return updateClassroom(this.classroomModel,new Types.ObjectId(id),update)
  }

  //to delete the classroom using id
  async delete(id: string): Promise<boolean> {
    return deleteClassroom(this.classroomModel,new Types.ObjectId(id))
  }

  //to get the classroom using
  async findClassroom(code: string): Promise<IClassroom | null> {
    return findClassroom(this.classroomModel,code)
  }

  //to get the classroom of a particular user
  async findAllClassrooms(studentId: string): Promise<IClassroom[]> {
    return findAllClassrooms(this.classroomModel,studentId)
  }

  //to get the classroom creator
  async findCreatorClassrooms(id: string): Promise<IClassroom[]> {
    return getCreatorClassrooms(this.classroomModel,new Types.ObjectId(id))
  }

  //to find all the participants of a classroom
  async findAllparticipants(id: string): Promise<IClassroom | null> {
    return findAllparticipants(this.classroomModel,new Types.ObjectId(id))
  }

  //get all the classrooms of a user
  async getAllClassroom(id: string):Promise<IClassroom[]> {
    return getAllTheClassroom(this.classroomModel,new Types.ObjectId(id))
  }

  //to filter the classroom based on the category
  async classroomFilter(id: string, category: string[]):Promise<IClassroom[]> {
     return classroomFilter(this.classroomModel,new Types.ObjectId(id),category);
  }

  //get all the classrooms of all the users
  async findAllUsersClassroom(page: number = 1, pageSize: number = 10):Promise<IClassroom[]> {
    return findAllUsersClassroom(this.classroomModel,page,pageSize);
  }

  //to find the classroom using search
async findSearchedClassroom(page: number = 1, pageSize: number = 10, searchQuery: string) {
   return findSearchedClassroom(this.classroomModel,page,pageSize,searchQuery)
}

  //to update the profile photo of all the classroom where he is admin
  async updateProfile(id: string, update: { profile: string }) {
    return updateProfile(this.classroomModel,new Types.ObjectId(id),update)
  }

  async getReportedClassrooms(page: number = 1, pageSize: number = 10) {
    return getReportedClassrooms(this.classroomModel,page,pageSize)
  }
  
}
