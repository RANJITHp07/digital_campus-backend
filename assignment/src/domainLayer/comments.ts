export interface IReply {
    username: string;
    replyComment: string;
  }

export interface IComment{
    assignment_id:string,
    username:string,
    comment:string,
    reply:IReply[];
    type: 'private' | 'public'
}