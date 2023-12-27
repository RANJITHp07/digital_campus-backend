import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
  assignment_id: string;
  username: string;
  comment: string;
  type: 'private' | 'public';
}

const commentSchema = new Schema<IComment>({
  assignment_id: { type: String, required: true },
  username: { type: String, required: true },
  comment: { type: String, required: true },
  type: { type: String, enum: ['private', 'public'], required: true },
});

const CommentModel = mongoose.model<IComment>('Comment', commentSchema);

export default CommentModel;
