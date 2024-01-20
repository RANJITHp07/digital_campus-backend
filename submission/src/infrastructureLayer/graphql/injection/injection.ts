import { SubmissionController } from "../../../adapterLayer/submission";
import { Submissionusecase } from "../../../usecaseLayer/usecase/submissionusecase";
import { ErrorHandler } from "../../middleware/error/userErrorhandler";
import AssignmentModel from "../../model/assignment";
import submissionModel from "../../model/submission";
import { AssignmentRepository } from "../../respository/queries/assignmentRepository";
import { SubmissionRepository } from "../../respository/queries/submissionRepository";

const assignmentRepository=new AssignmentRepository(AssignmentModel);
const submissionRepository=new SubmissionRepository(submissionModel);
const errorHandler=new ErrorHandler()
const usecase=new Submissionusecase(submissionRepository,assignmentRepository,errorHandler);
const controller=new SubmissionController(usecase);

export default controller