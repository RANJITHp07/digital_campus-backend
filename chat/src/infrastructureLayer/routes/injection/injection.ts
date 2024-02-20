import MessageRepository from "../../repository/queries/messageRespository";
import MessageModel from "../../model/message";
import UserModel from "../../model/users";
import { Messageusecase } from "../../../usecaseLayer/usecase/messageusecase";
import Messageadapter from "../../../adapterLayer/messageAdapter";
import UserRepository from "../../repository/queries/userRepository";


export const userrepository = new UserRepository(UserModel);
const repository = new MessageRepository(MessageModel);
const usecase = new Messageusecase(repository);
const controller = new Messageadapter(usecase);

export default controller;
