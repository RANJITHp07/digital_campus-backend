import { Adminadapter } from "../../adapter/adminAdapter";
import { Adminusecase } from "../../usecase/adminusecase";
import { Admin } from "../entities/admin";
import { AdminRepository } from "../repository/adminRepository";
import Encrypt from "../repository/bcryptRepository";
import express,{Request,Response,NextFunction} from 'express'
import jwtPassword from "../repository/jwtRepository";


const repository=new AdminRepository(Admin)
const bcrypt=new Encrypt()
const jwt=new jwtPassword()
const usecase=new Adminusecase(repository,bcrypt,jwt)
const adapter=new Adminadapter(usecase);

const router=express.Router();

router.post("/create",(req,res,next:NextFunction) =>adapter.createAdmin(req,res,next) )

export  default router