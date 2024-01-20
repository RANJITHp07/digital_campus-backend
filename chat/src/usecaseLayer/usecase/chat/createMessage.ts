import IMessage from "../../../domainLayer/message";
import { Response } from "../../interface/Response";
import IMessageRepository from "../../interface/messageConversation";

export const createMessage=async(messageRepository:IMessageRepository,message: IMessage):Promise<Response>=>{
    try {
      const newMessage = await messageRepository.create(message);
      return {
        status: 201,
        success: true,
        message: newMessage as string,
      };
    } catch (err) {
      throw err;
    }
  }