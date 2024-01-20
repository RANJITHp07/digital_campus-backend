import { IComment, IReply } from "../../domainLayer/comments";

export interface ICommentRepository{
    create(comment:IComment):Promise<string>
    delete(id:string):Promise<boolean>
    getComments(assignmentId: string): Promise<{ publicMessages: IComment[], privateMessages: IComment[] }> 
    updateReply(id:string,reply:IReply):Promise<boolean>
    deleteReply(id:string,reply:IReply):Promise<boolean>
}