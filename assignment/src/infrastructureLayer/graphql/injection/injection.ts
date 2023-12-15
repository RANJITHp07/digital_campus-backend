import { AssignmentController } from "../../../adapterLayer/assignmentAdapter";
import { AssignmentUsecase } from "../../../usecaseLayer/assignmentusecase";
import { ErrorHandler } from "../../middleware/error/userErrorhandler";
import { AssignmentRepository } from "../../repository/assignmentRepository";

//factory pattern
const repository =new AssignmentRepository();
const errorHandler=new ErrorHandler()
const usecase=new AssignmentUsecase(repository,errorHandler);
 const controller=new AssignmentController(usecase,errorHandler)

 export {errorHandler,controller}