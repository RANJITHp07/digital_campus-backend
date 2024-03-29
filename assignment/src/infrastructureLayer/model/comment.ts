import mongoose, { Document, Schema } from 'mongoose';

interface IReply {
  username: string;
  replyComment: string;
}

export interface ICommentModel extends Document {
  assignment_id: string;
  username: string;
  comment: string;
  reply: IReply[]; 
  type: 'private' | 'public';
}

const commentSchema = new Schema<ICommentModel>({
  assignment_id: { type: String, required: true },
  username: { type: String, required: true },
  comment: { type: String, required: true },
  reply: [{
    username: { type: String },
    replyComment: { type: String },
  }],
  type: { type: String, enum: ['private', 'public'], required: true },
});

const CommentModel = mongoose.model<ICommentModel>('Comment', commentSchema);

export default CommentModel;
