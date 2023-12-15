import express,{Request,Response,NextFunction} from 'express';
import MessageRepository from "../repository/messageRespository"
import MessageModel from "../model/message"
import {Messageusecase} from "../../usecase/messageusecase"
import Messageadapter from '../../adapter/messageAdapter';

const model=new MessageModel()
const repository=new MessageRepository(model)
const usecase=new Messageusecase(repository)
const controller=new Messageadapter(usecase)

const route=express.Router();

route.get('/:id',(req: Request, res: Response, next: NextFunction) => controller.getMessage(req,res,next))

export default route;
