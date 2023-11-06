import { UserRepository } from "../repository/userRepository";
import { Userusecase } from "../../usecase/userusecase";
import Encrypt from "../repository/bcryptRepository";
import { UserAdapter } from "../../adapter/userAdapter";
import { Users } from "../entities/user";
import express, { NextFunction,Request,Response } from  'express'
import jwtPassword from "../repository/jwtRepository";
import Nodemailer from "../repository/nodemailer";


// factory pattern 
const userRepository = new UserRepository(Users);
const bcrypt=new Encrypt()
const jwt=new jwtPassword()
const nodemailer=new Nodemailer()
const userusecase=new Userusecase(userRepository,bcrypt,jwt,nodemailer);
const useradapter=new UserAdapter(userusecase);

const router= express.Router();

//routes

router.post("/signup",(req:Request, res:Response,next:NextFunction)=>useradapter.createUser(req,res,next));
router.post("/login",(req:Request, res:Response,next:NextFunction)=>useradapter.loginUser(req,res,next));
router.post("/getAllusers",(req:Request, res:Response,next:NextFunction)=>useradapter.getAllusers(req,res,next));
router.post("/:email",(req:Request, res:Response,next:NextFunction)=>useradapter.getUser(req,res,next));
router.post("/sendEmail",(req:Request, res:Response,next:NextFunction)=>useradapter.sendEmail(req,res,next));
router.post("/verifyEmail",(req:Request, res:Response,next:NextFunction)=>useradapter.emailVerification(req,res,next));


export default router