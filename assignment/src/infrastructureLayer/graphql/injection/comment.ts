import { ErrorHandler } from "../../../../../classroom/src/infrastructureLayer/middleware/error/userErrorhandler";
import { CommentAdapter } from "../../../adapterLayer/commentAdapter";
import { Commentusecase } from "../../../usecaseLayer/usecase/commentusecase";
import { CommentRepository } from "../../repository/queries/commentRepository";


//factory pattern
const repository=new CommentRepository();
const errorHandler=new ErrorHandler()
const usecase=new Commentusecase(repository,errorHandler);
const controller=new CommentAdapter(usecase,errorHandler);

export {controller, errorHandler}