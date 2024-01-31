import { IClassroom } from "../domainLayer/classroom";
import { IClassroomRepository } from "./interface/classroomRepository";
import { IRandomgenerator } from "./interface/uniqueRepositroy";
import { IErrorHandler } from "./interface/errorHandler";
import INodemailerRepository from "./interface/nodemailerRepository";
import { IRequestValidator } from "../../../auth/src/usecaseLayer/interface/validateRepository";
import { IRequester } from "./interface/requester";
import { addRequest, addToAdmin, addUser, createClassroom, deleteClassroom, emailInvitation, getAllClassroomParticipants, getAllClassrooms, getAllTheClassroom, getAllUsersClassrooms, getClassroomDetails, getClassroomDetailsWithId, getCreatorClassrooms, getFilteredClassroom, getReportedClassroom, removeFromAdmin, searchClassroom, updateClassroom } from "./classRoom/index";

export class Classroomusecase {
  private readonly classroomrepository: IClassroomRepository;
  private readonly randomGenerator: IRandomgenerator;
  private readonly errorHandler: IErrorHandler;
  private readonly nodemailer: INodemailerRepository;
  private readonly requestValidator:IRequestValidator;
  private readonly requester: IRequester;

  constructor(
    classroomrepository:IClassroomRepository,
    randomGenerator: IRandomgenerator,
    errorHandler: IErrorHandler,
    nodemailer:  INodemailerRepository,
    requestValidator: IRequestValidator,
    requester: IRequester
  ) {
    this.classroomrepository = classroomrepository;
    this.randomGenerator = randomGenerator;
    this.errorHandler = errorHandler;
    this.nodemailer = nodemailer;
    this.requestValidator = requestValidator;
    this.requester = requester;
  }

  //to create the classroom
  async create(classroom: IClassroom) {
    return createClassroom(this.classroomrepository,this.errorHandler,this.requestValidator,this.randomGenerator,classroom);
  }

  //to update the classroom
  async update({
    id,
    update,
  }: {
    id: string;
    update: Partial<IClassroom>;
  }){
     return updateClassroom(this.classroomrepository,this.errorHandler,this.requestValidator,id,update)
  }

  // to delete the existing classroom
  async delete({ id }: { id: string }) {
    return deleteClassroom(this.classroomrepository,this.errorHandler,id)
  }

  //to add a student into
  async addUser({
    code,
    userId,
    type,
  }: {
    code: string;
    userId: string;
    type: boolean;
  }){
    return addUser(this.classroomrepository,this.errorHandler,this.requestValidator,code,userId,type)
  }

  //to add a student into the request
  async addRequest({
    id,
    name,
    email,
    code,
    type,
  }: {
    id: string;
    name: string;
    email: string;
    code: string;
    type: boolean;
  }) {
     return addRequest(this.classroomrepository,this.errorHandler,id,name,email,code,type,)
  }

  //to get the classroom details using the code of the classroom
  async getClassroom({ code }: { code: string }) {
     return getClassroomDetails(this.classroomrepository,this.errorHandler,code)
  }

  //to get all the classroom which is created or on which the user is added into
  async getAllclassroom({ id }: { id: string }) {
    return getAllClassrooms(this.classroomrepository,id)
  }

  //to get all the classroom user has created
  async getCreatorclassroom({ id }: { id: string }) {
    return getCreatorClassrooms(this.classroomrepository,id)
  }

  //to get all the participants of the classroom
  async getAllClassroomparticipants({ id }: { id: string }) {
     return getAllClassroomParticipants(this.classroomrepository,this.requester,id)
  }

  //to get the classroom details
  async getClassroomDetail({ id }: { id: string }) {
    return getClassroomDetailsWithId(this.classroomrepository,this.errorHandler,id)
  }

  //to get all the classroom details of a particular user
  async getAllTheClassroom({ id }: { id: string }) {
    return getAllTheClassroom(this.classroomrepository,id)
  }

  //to get all the classroom
  async getAllUsersClassrooms({page}:{page:number}) {
    return getAllUsersClassrooms(this.classroomrepository,page)
  }

  //to filter out based on the category
  async getFilteredclassroom({
    id: userId,
    category,
  }: {
    id: string;
    category: string[];
  }) {
     return getFilteredClassroom(this.classroomrepository,this.requestValidator,userId,category)
  }

  async addToAdmin({
    id: userId,
    classroomId,
  }: {
    id: string;
    classroomId: string;
  }) {
     return addToAdmin(this.classroomrepository,this.requestValidator, this.errorHandler,userId,classroomId)
  }

  async removeFromAdmin({
    id: userId,
    classroomId,
  }: {
    id: string;
    classroomId: string;
  }) {
    return removeFromAdmin(this.classroomrepository,this.errorHandler,this.requestValidator,userId,classroomId)
  }

  async emailInvitation({
    fromEmail,
    toEmail,
    username,
    creator,
    code,
  }: {
    fromEmail: string;
    toEmail: string;
    username: string;
    creator: string;
    code: string;
  }) {
    return emailInvitation(this.nodemailer,this.requestValidator,this.errorHandler,fromEmail,toEmail,username,creator,code)
  }

  async getReportedClassroom({page}:{page:number}) {
    return getReportedClassroom(this.classroomrepository,page)
  }

  async searchClassroom({page,text}:{page:number,text:string}){
     return searchClassroom(this.classroomrepository,page,text)
  }
}


