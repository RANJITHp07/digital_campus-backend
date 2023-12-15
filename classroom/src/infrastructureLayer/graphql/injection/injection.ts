import { ClassroomController } from "../../../adapterLayer/classroomController"
import { IClassroom } from "../../../domainLayer/classroom"
import { Classroomusecase } from "../../../usecaseLayer/classRoomusecase"
import { ErrorHandler } from "../../middleware/error/userErrorhandler"
import classroomModel from "../../models/classroom"
import { ClassRoomRepository } from "../../repository/classroomRepository"
import Listener from "../../repository/listenrepository"
import Nodemailer from "../../repository/nodemailerRepository"
import Publisher from "../../repository/publishrepository"
import { RandomNumber } from "../../repository/uniqueNumberRepository"
import RequestValidator from "../../repository/validatorRepository"


//factory method
const model=new classroomModel()
const repository=new ClassRoomRepository(model)
const code=new RandomNumber()
const errorHandler=new ErrorHandler()
const nodemailer=new Nodemailer()
const publish=new Publisher()
const listner=new Listener()
const requestValidator=new RequestValidator()
const usecase=new Classroomusecase(repository,code,errorHandler,publish,listner,nodemailer,requestValidator)
const controller =new ClassroomController(usecase,errorHandler)

export {controller,errorHandler}