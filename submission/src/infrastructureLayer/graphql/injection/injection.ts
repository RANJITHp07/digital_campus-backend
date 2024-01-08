import { SubmissionController } from "../../../adapterLayer/submission";

import { Submissionusecase } from "../../../usecaseLayer/usecase/submissionusecase";
import { ErrorHandler } from "../../middleware/error/userErrorhandler";
import { AssignmentRepository } from "../../respository/assignment";
import { SubmissionRepository } from "../../respository/submission";

const assignmentRepository=new AssignmentRepository();
const submissionRepository=new SubmissionRepository();
const errorHandler=new ErrorHandler()
const usecase=new Submissionusecase(submissionRepository,assignmentRepository,errorHandler);
const controller=new SubmissionController(usecase);

export default controller