import mongoose, { Document,Schema } from "mongoose";

interface IMessage extends Document {
  classId: string;
  sender: Schema.Types.ObjectId;
  text:{
    type:string,
    text:string
  };
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new mongoose.Schema<IMessage>(
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
      type:{
        type:String
    },
    text:{
        type:String
    }
    },
  },
  { timestamps: true }
);

const MessageModel= mongoose.model<IMessage>("Message", MessageSchema);

export default MessageModel
