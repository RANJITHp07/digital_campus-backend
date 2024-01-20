import IMessage from "../../../domainLayer/message";
import { Response } from "../../interface/Response";
import IMessageRepository from "../../interface/messageConversation";

export const  getMessage=async(messageRepository:IMessageRepository,id: string, skip: number):Promise<Response>=>{
    try {
      const messages = await messageRepository.getConversation(id, skip);
      return {
        status: 201,
        success: true,
        data: messages as IMessage,
      };
    } catch (err) {
      throw err;
    }
  }