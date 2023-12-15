import MessageRepository from "../../repository/queries/messageRespository"
import MessageModel from "../../model/message"
import {Messageusecase} from "../../../usecaseLayer/messageusecase"
import Messageadapter from '../../../adapterLayer/messageAdapter';

const model=new MessageModel()
const repository=new MessageRepository(model)
const usecase=new Messageusecase(repository)
const controller=new Messageadapter(usecase)

export default controller