import IMessage from "../../../domainLayer/message";
import IMessageRepository from "../../../usecaseLayer/interface/messageConversation";
import MessageModel, { IMessageModel } from "../../model/message";

export default class MessageRepository implements IMessageRepository {
  constructor(private readonly messageModel:unknown) {}

  //to create the message
  async create(newMessageData: IMessage ): Promise<IMessageModel> {
    try {
      const newMessage = (await MessageModel.create(newMessageData)).populate('sender');
      return newMessage;
    } catch (error) {
      throw error;
    }
  }

  //to getConversation of a particular classroom
  async getConversation(classId: string, skip: number): Promise<IMessageModel[]> {
    try {
      const conversation = await MessageModel
        .find({ classId })
        .populate('sender')
        .sort({ createdAt: -1 })
        .limit(10)
        .skip(skip) as IMessageModel[];
  
      return conversation;
    } catch (error) {
      throw error;
    }
  }
}
