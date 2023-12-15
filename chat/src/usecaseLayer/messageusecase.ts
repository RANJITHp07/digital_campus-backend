import IMessage from "../domainLayer/message";
import MessageRepository from "../infrastructureLayer/repository/queries/messageRespository";

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

    async getMessage(id:string,skip:number){
        try{
           const messages=await this.messageRepository.getConversation(id,skip)
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