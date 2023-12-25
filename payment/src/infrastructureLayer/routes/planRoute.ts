import { PlanController } from "../../adapterLayer/planAdapter";
import { Planusecase } from "../../usecaseLayer/usecase/planusecase";
import { PlanRepository } from "../repository/queries/planRepository";
import RequestValidator from "../repository/services/validatorRepository";
import express,{Request,Response,NextFunction} from 'express'

//factory pattern
const validator=new RequestValidator()
const repository=new PlanRepository('');
const usecase=new Planusecase(repository,validator);
const controller=new PlanController(usecase)


const router=express.Router()

router.use(express.json());

router
    .route('/')
    .post((req:Request,res:Response,next:NextFunction) =>controller.createPlan(req,res,next))
    .get((req:Request,res:Response,next:NextFunction) =>controller.getPlans(req,res,next))
    .put((req:Request,res:Response,next:NextFunction) =>controller.updatePlan(req,res,next))
    .delete((req:Request,res:Response,next:NextFunction) =>controller.deletePlan(req,res,next))



export default router