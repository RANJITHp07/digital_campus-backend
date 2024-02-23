import { Model } from "mongoose";
import { IMessageModel } from "../../../model/message";
import IMessage from "../../../../domainLayer/message";

export const createMessage = async (
  messageModel: Model<IMessageModel>,
  message: IMessage
): Promise<string> => {
  try {
    const newMessage = await messageModel.create(message);
    return newMessage ;
} catch (error) {
    throw error;
  }
};
