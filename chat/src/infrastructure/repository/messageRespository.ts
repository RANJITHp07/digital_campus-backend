import IMessage from "../../domain/message"
import IMessageRepository from "../../usecase/interface/messageConversation"
import MessageModel from "../model/message"



export class MessageRepository implements IMessageRepository{
    constructor(messageModel:any){}


    async create(message:any):Promise<unknown>{
        try{
            const newMessage=(await MessageModel.create(message)).populate('sender')
            return newMessage
        }catch(err){
            throw err
        }
    }


    async getConversation(id:string):Promise<unknown>{
        try{
          const convo=await MessageModel.find({classId:id}).populate('sender')
          return convo
        }catch(err){
            throw err
        }
    }

}

export default MessageRepository