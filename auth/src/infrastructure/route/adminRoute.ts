import { AdminAdapter } from "../../adapter/adminAdapter";
import { Adminusecase } from "../../usecase/adminusecase";
import { Admin } from "../entities/admin";
import { AdminRepository } from "../repository/adminRepository";
import Encrypt from "../repository/bcryptRepository";
import express, { NextFunction,Request,Response } from 'express'
import Nodemailer from "../repository/nodemailer";

const router= express.Router();

//factory pattern 
const model= new Admin();
const adminrepository = new AdminRepository(model);
const bcrypt=new Encrypt()
const nodemailer=new Nodemailer()
const adminusecase=new Adminusecase(adminrepository,bcrypt,nodemailer);
const adminadapter=new AdminAdapter(adminusecase);

//routes
router.post("/signup",(req:Request,res:Response,next:NextFunction)=>adminadapter.create(req,res,next));
router.post("/login",(req:Request, res:Response,next:NextFunction)=>adminadapter.adminLogin(req,res,next));
router.post("/:email",(req:Request, res:Response,next:NextFunction)=>adminadapter.findAdmin(req,res,next));
router.post("/sendEmail",(req:Request, res:Response,next:NextFunction)=>adminadapter.findAdmin(req,res,next));

export default router