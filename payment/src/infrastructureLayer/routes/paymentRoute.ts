import express,{Request,Response,NextFunction} from 'express'
import RazorpayController from './injection/injection'


const router=express.Router()


router.post('/subscription',(req:Request,res:Response,next:NextFunction) =>RazorpayController.createSubscription(req,res,next))
router.post('/verification',(req:Request,res:Response,next:NextFunction) =>RazorpayController.paymentVerification(req,res,next))


export default router