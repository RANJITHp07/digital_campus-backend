import IMessage from "../domain/message";
import MessageRepository from "../infrastructure/repository/messageRespository";

export class Messageusecase{
    private readonly messageRepository: MessageRepository;

    constructor(messageRepository: MessageRepository){
        this.messageRepository = messageRepository;
    }

    async createMessage(message:IMessage){
        try{
            const newMessage=await this.messageRepository.create(message)
            return {
                status:201,
                success:true,
                message:newMessage
            }
        }catch(err){
            throw err
        }
    }

    async getMessage(id:string){
        try{
           const messages=await this.messageRepository.getConversation(id)
           return {
            status:201,
            success:true,
            data:messages
           }
        }catch(err){
            throw err
        }
    }
}