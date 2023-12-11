import IMessage from "../../domain/message";

interface IMessageRepository{
    create(message:any):Promise<unknown>
    getConversation(id:string):Promise<unknown>

}

export default IMessageRepository