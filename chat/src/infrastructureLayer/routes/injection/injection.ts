import MessageRepository from "../../repository/queries/messageRespository";
import MessageModel from "../../model/message";
import { Messageusecase } from "../../../usecaseLayer/messageusecase";
import Messageadapter from "../../../adapterLayer/messageAdapter";
import UserRepository from "../../repository/queries/userRepository";

const model = new MessageModel();
export const userrepository = new UserRepository("");
const repository = new MessageRepository(model);
const usecase = new Messageusecase(repository);
const controller = new Messageadapter(usecase);

export default controller;
