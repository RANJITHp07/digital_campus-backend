import { AssignmentController } from "../../../adapterLayer/assignmentAdapter";
import { AssignmentUsecase } from "../../../usecaseLayer/usecase/assignmentusecase";
import { ErrorHandler } from "../../middleware/error/userErrorhandler";
import { AssignmentRepository } from "../../repository/queries/assignmentRepository";
import Publisher from "../../repository/rabbitmq/publishrepository";

//factory pattern
const repository =new AssignmentRepository();
const errorHandler=new ErrorHandler()
const publisher=new Publisher()
const usecase=new AssignmentUsecase(repository,errorHandler,publisher);
 const controller=new AssignmentController(usecase,errorHandler)

 export {errorHandler,controller}