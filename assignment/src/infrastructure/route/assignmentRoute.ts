import express, { NextFunction, Request, Response } from 'express'
import { AssignmentController } from "../../adapter/assignmentAdapter";
import { AssignmentUsecase } from "../../usecase/assignmentusecase";
import { ErrorHandler } from "../middleware/error/userErrorhandler";
import { AssignmentRepository } from "../repository/assignmentRepository";

const respository= new AssignmentRepository();
const errorHandler = new ErrorHandler()
const usecase=new AssignmentUsecase(respository,errorHandler)
const controller = new AssignmentController(usecase,errorHandler)


const router= express.Router();

router.post("/create",(req:Request,res:Response,next:NextFunction) =>controller.create(req,res,next))
router.get("/:id",(req:Request,res:Response,next:NextFunction) =>controller.getAllassignments(req,res,next))
router.get("/task/:id",(req:Request,res:Response,next:NextFunction) =>controller.getOneassignments(req,res,next))

export default router