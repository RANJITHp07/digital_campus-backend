import { AssignmentController } from "../../../adapterLayer/assignmentAdapter";
import { AssignmentUsecase } from "../../../usecaseLayer/usecase/assignmentusecase";
import { ErrorHandler } from "../../middleware/error/userErrorhandler";
import AssignmentModel from "../../model/assignment";
import { AssignmentRepository } from "../../repository/queries/assignmentRepository";
import Publisher from "../../repository/rabbitmq/publishrepository";
import RequestValidator from "../../repository/service/validatorRepository";

//factory pattern
const repository =new AssignmentRepository(AssignmentModel);
const errorHandler=new ErrorHandler()
const publisher=new Publisher()
const requestValidator=new RequestValidator()
const usecase=new AssignmentUsecase(repository,errorHandler,publisher,requestValidator);
 const controller=new AssignmentController(usecase)

 export {errorHandler,controller}