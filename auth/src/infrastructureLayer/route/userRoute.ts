import express, { NextFunction,Request,Response } from  'express'
import validateMiddleware from "../utils/validator";
import { userAdapter } from './injection/userInjection';

const router= express.Router();

//routes of user 
router.post("/signup",validateMiddleware,(req:Request, res:Response,next:NextFunction)=> userAdapter.createUser(req,res,next));
router.post("/login",(req:Request, res:Response,next:NextFunction)=> userAdapter.loginUser(req,res,next));
router.put("/updateUser",(req:Request, res:Response,next:NextFunction)=> userAdapter.updateUser(req,res,next))
router.get("/:email",(req:Request, res:Response,next:NextFunction)=> userAdapter.getUser(req,res,next));
router.patch("/resetPassword",(req:Request, res:Response,next:NextFunction)=> userAdapter.resetPassword(req,res,next))
router.get("/pagination/page",(req:Request, res:Response,next:NextFunction)=> userAdapter.paginateUsers(req,res,next))
router.get("/searchUser/page",(req:Request, res:Response,next:NextFunction)=> userAdapter.searchUser(req,res,next))
router.get("/get/getAllusers",(req:Request, res:Response,next:NextFunction)=> userAdapter.getAllusers(req,res,next))


//routes for email verification
router.post("/sendEmail",(req:Request, res:Response,next:NextFunction)=> userAdapter.sendEmail(req,res,next));
router.post("/verifyEmail",(req:Request, res:Response,next:NextFunction)=> userAdapter.emailVerification(req,res,next));


export default router