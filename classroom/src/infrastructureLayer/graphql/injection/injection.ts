import { ClassroomController } from "../../../adapterLayer/classroomController";
import { Classroomusecase } from "../../../usecaseLayer/classRoomusecase";
import { ErrorHandler } from "../../middleware/error/userErrorhandler";
import classroomModel from "../../models/classroom";
import { ClassRoomRepository } from "../../repository/queries/classroomRepository";
import Requester from "../../repository/rabbitmq/client";
import Nodemailer from "../../repository/services/nodemailerRepository";
import { RandomNumber } from "../../repository/services/uniqueNumberRepository";
import RequestValidator from "../../repository/services/validatorRepository";

//factory method
const repository = new ClassRoomRepository(classroomModel);
const code = new RandomNumber();
const errorHandler = new ErrorHandler();
const nodemailer = new Nodemailer();
const requestValidator = new RequestValidator();
const requester = new Requester();
const usecase = new Classroomusecase(
  repository,
  code,
  errorHandler,
  nodemailer,
  requestValidator,
  requester
);
const controller = new ClassroomController(usecase);

export { controller, errorHandler };
