import mongoose, { Document, Schema } from "mongoose";

enum MessageType {
  Text = "text",
  Audio = "audio",
  Video = "vedio",
  PDF = "pdf",
  PHOTO='photo'
}

export interface IMessageModel extends Document {
  classId: string;
  sender: Schema.Types.ObjectId;
  text: {
    type: MessageType;
    text: string;
    desc?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new mongoose.Schema<IMessageModel>(
  {
    classId: {
      type: String,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: {
        type: String,
        enum: Object.values(MessageType),
        required:true
      },
      text: {
        type: String,
        required:true
      },
      desc: {
        type: String,

      },
    },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model<IMessageModel>("Message", MessageSchema);

export default MessageModel;
