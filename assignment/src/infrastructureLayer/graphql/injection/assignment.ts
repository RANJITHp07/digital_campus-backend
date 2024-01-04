import { AssignmentController } from "../../../adapterLayer/assignmentAdapter";
import { AssignmentUsecase } from "../../../usecaseLayer/usecase/assignmentusecase";
import { ErrorHandler } from "../../middleware/error/userErrorhandler";
import { AssignmentRepository } from "../../repository/queries/assignmentRepository";
import Publisher from "../../repository/rabbitmq/publishrepository";
import RequestValidator from "../../repository/service/validatorRepository";

//factory pattern
const repository =new AssignmentRepository();
const errorHandler=new ErrorHandler()
const publisher=new Publisher()
const requestValidator=new RequestValidator()
const usecase=new AssignmentUsecase(repository,errorHandler,publisher,requestValidator);
 const controller=new AssignmentController(usecase)

 export {errorHandler,controller}