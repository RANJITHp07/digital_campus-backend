import IMessage from "../../domainLayer/message";
import MessageRepository from "../../infrastructureLayer/repository/queries/messageRespository";
import { createMessage, getMessage } from "./chat/index";

export class Messageusecase {
  private readonly messageRepository: MessageRepository;

  constructor(messageRepository: MessageRepository) {
    this.messageRepository = messageRepository;
  }

  async createMessage(message: IMessage) {
    return createMessage(this.messageRepository,message);
  }

  async getMessage(id: string, skip: number) {
    return getMessage(this.messageRepository,id,skip);
  }
}
