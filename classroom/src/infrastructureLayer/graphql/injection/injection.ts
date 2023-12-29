import { ClassroomController } from "../../../adapterLayer/classroomController"
import { Classroomusecase } from "../../../usecaseLayer/classRoomusecase"
import { ErrorHandler } from "../../middleware/error/userErrorhandler"
import classroomModel from "../../models/classroom"
import { ClassRoomRepository } from "../../repository/queries/classroomRepository"
import Requester from "../../repository/rabbitmq/client"
import Listener from "../../repository/rabbitmq/listenrepository"
import Nodemailer from "../../repository/services/nodemailerRepository"
import Publisher from "../../repository/rabbitmq/publishrepository"
import { RandomNumber } from "../../repository/services/uniqueNumberRepository"
import RequestValidator from "../../repository/services/validatorRepository"


//factory method
const model=new classroomModel()
const repository=new ClassRoomRepository(model)
const code=new RandomNumber()
const errorHandler=new ErrorHandler()
const nodemailer=new Nodemailer()
const publish=new Publisher()
const listner=new Listener()
const requestValidator=new RequestValidator()
const requester=new Requester()
const usecase=new Classroomusecase(repository,code,errorHandler,publish,listner,nodemailer,requestValidator,requester)
const controller =new ClassroomController(usecase,errorHandler)

export {controller,errorHandler}