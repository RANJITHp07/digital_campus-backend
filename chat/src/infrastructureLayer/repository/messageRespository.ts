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


    async getConversation(id:string,skip:number):Promise<unknown>{
        try{
          const convo=await MessageModel.find({classId:id}).populate('sender').sort({createdAt:-1}).limit(10).skip(skip)
          return convo
        }catch(err){
            throw err
        }
    }

}

export default MessageRepository