import IMessage from "../../domain/message";

interface IMessageRepository{
    create(message:any):Promise<unknown>
    getConversation(id:string,skip:number):Promise<unknown>

}

export default IMessageRepository