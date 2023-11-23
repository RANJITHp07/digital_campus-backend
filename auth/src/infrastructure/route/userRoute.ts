import { UserRepository } from "../repository/userRepository";
import { Userusecase } from "../../usecase/userusecase";
import Encrypt from "../repository/bcryptRepository";
import { UserAdapter } from "../../adapter/userAdapter";
import { Users } from "../entities/user";
import express, { NextFunction,Request,Response } from  'express'
import jwtPassword from "../repository/jwtRepository";
import Nodemailer from "../repository/nodemailer";
import validateMiddleware from "../utils/validator";
import Publisher from "../repository/publishrepository";
import Listener from "../repository/listenrepository";


// factory pattern 
const userRepository = new UserRepository(Users);
const bcrypt=new Encrypt()
const jwt=new jwtPassword()
const nodemailer=new Nodemailer()
const publisher=new Publisher()
const listener=new Listener()
const userusecase=new Userusecase(userRepository,bcrypt,jwt,nodemailer,publisher,listener);
const useradapter=new UserAdapter(userusecase);

const router= express.Router();

//routes of user 
router.post("/signup",validateMiddleware,(req:Request, res:Response,next:NextFunction)=>useradapter.createUser(req,res,next));
router.post("/login",(req:Request, res:Response,next:NextFunction)=>useradapter.loginUser(req,res,next));
router.get("/getAllusers",(req:Request, res:Response,next:NextFunction)=>useradapter.getAllusers(req,res,next));
router.put("/updateUser",(req:Request, res:Response,next:NextFunction)=>useradapter.updateUser(req,res,next))
router.get("/:email",(req:Request, res:Response,next:NextFunction)=>useradapter.getUser(req,res,next));
router.put("/restPassword",(req:Request, res:Response,next:NextFunction)=>useradapter.resetPassword(req,res,next))

//routes for email verification
router.post("/sendEmail",(req:Request, res:Response,next:NextFunction)=>useradapter.sendEmail(req,res,next));
router.post("/verifyEmail",(req:Request, res:Response,next:NextFunction)=>useradapter.emailVerification(req,res,next));


export default router