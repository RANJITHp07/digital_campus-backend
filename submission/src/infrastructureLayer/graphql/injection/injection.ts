import { SubmissionController } from "../../../adapterLayer/submission";
import { Submissionusecase } from "../../../usecaseLayer/usecase/submissionusecase";
import { AssignmentRepository } from "../../respository/assignment";
import { SubmissionRepository } from "../../respository/submission";

const assignmentRepository=new AssignmentRepository();
const submissionRepository=new SubmissionRepository();
const usecase=new Submissionusecase(submissionRepository,assignmentRepository);
const controller=new SubmissionController(usecase);

export default controller