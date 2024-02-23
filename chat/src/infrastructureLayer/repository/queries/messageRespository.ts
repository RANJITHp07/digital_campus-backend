import { Model } from "mongoose";
import IMessage from "../../../domainLayer/message";
import IMessageRepository from "../../../usecaseLayer/interface/messageConversation";
import  { IMessageModel } from "../../model/message";
import { createMessage, getConversation } from "./chat/index";

export default class MessageRepository implements IMessageRepository {
  constructor(private readonly messageModel: Model<IMessageModel>) {}

  //to create the message
  async create(newMessage: IMessage): Promise<unknown> {
    return createMessage(this.messageModel,newMessage)
  }

  //to getConversation of a particular classroom
  async getConversation(
    classId: string,
    skip: number
  ): Promise<IMessageModel[]> {
   return getConversation(this.messageModel,classId,skip);
}
}
