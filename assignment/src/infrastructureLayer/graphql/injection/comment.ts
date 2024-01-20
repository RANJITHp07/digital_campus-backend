import { ErrorHandler } from "../../middleware/error/userErrorhandler";
import { CommentAdapter } from "../../../adapterLayer/commentAdapter";
import { Commentusecase } from "../../../usecaseLayer/usecase/commentusecase";
import { CommentRepository } from "../../repository/queries/commentRepository";
import RequestValidator from "../../repository/service/validatorRepository";
import CommentModel from "../../model/comment";


//factory pattern
const repository=new CommentRepository(CommentModel);
const errorHandler=new ErrorHandler()
const requestValidator=new RequestValidator()
const usecase=new Commentusecase(repository,errorHandler,requestValidator);
const controller=new CommentAdapter(usecase);

export {controller, errorHandler}