import { UserRepository } from "../repository/queries/userRepository";
import { Userusecase } from "../../usecase/usecase/userusecase";
import Encrypt from "../repository/services/bcryptRepository";
import { UserAdapter } from "../../adapter/userAdapter";
import { Users } from "../entities/user";
import express, { NextFunction,Request,Response } from  'express'
import jwtPassword from "../repository/services/jwtRepository";
import Nodemailer from "../repository/services/nodemailer";
import validateMiddleware from "../utils/validator";
import Publisher from "../repository/rabbitmq/publishrepository";
import Listener from "../repository/rabbitmq/listenrepository";
import RequestValidator from "../repository/services/validatorRepository";


// factory pattern 
const userRepository = new UserRepository(Users);
const bcrypt=new Encrypt()
const jwt=new jwtPassword()
const nodemailer=new Nodemailer()
const publisher=new Publisher()
const listener=new Listener()
const requestValidator=new RequestValidator()
const userusecase=new Userusecase(userRepository,bcrypt,jwt,nodemailer,publisher,listener,requestValidator);
const useradapter=new UserAdapter(userusecase);

const router= express.Router();

//routes of user 
router.post("/signup",validateMiddleware,(req:Request, res:Response,next:NextFunction)=>useradapter.createUser(req,res,next));
router.post("/login",(req:Request, res:Response,next:NextFunction)=>useradapter.loginUser(req,res,next));
router.put("/updateUser",(req:Request, res:Response,next:NextFunction)=>useradapter.updateUser(req,res,next))
router.get("/:email",(req:Request, res:Response,next:NextFunction)=>useradapter.getUser(req,res,next));
router.patch("/resetPassword",(req:Request, res:Response,next:NextFunction)=>useradapter.resetPassword(req,res,next))
router.get("/pagination/page",(req:Request, res:Response,next:NextFunction)=>useradapter.paginateUsers(req,res,next))
router.get("/searchUser/page",(req:Request, res:Response,next:NextFunction)=>useradapter.searchUser(req,res,next))
router.get("/get/getAllusers",(req:Request, res:Response,next:NextFunction)=>useradapter.getAllusers(req,res,next))


//routes for email verification
router.post("/sendEmail",(req:Request, res:Response,next:NextFunction)=>useradapter.sendEmail(req,res,next));
router.post("/verifyEmail",(req:Request, res:Response,next:NextFunction)=>useradapter.emailVerification(req,res,next));


export default router