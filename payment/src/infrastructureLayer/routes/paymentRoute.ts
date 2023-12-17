import { PaymentAdapter } from "../../adapterLayer/paymentAdapter";
import { PaymentUsecase } from "../../usecaseLayer/paymentusecase";
import { PaymentRepository } from "../repository/paymentRepository";
import RequestValidator from "../repository/validatorRepository";
import express,{Request,Response,NextFunction} from 'express'


const repository=new PaymentRepository('','');
const validator=new RequestValidator()
const usecase=new PaymentUsecase(repository,validator);
const controller=new PaymentAdapter(usecase);


const router=express.Router()


router.post('/subscription',(req:Request,res:Response,next:NextFunction) =>controller.createSubscription(req,res,next))

export default router