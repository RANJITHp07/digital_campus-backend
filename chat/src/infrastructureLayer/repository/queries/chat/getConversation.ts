import { Model } from "mongoose";
import{ IMessageModel } from "../../../model/message";

export const getConversation=async(
    messageModel:Model<IMessageModel>,
    classId: string,
    skip: number
  ): Promise<IMessageModel[]>=>{
  
    try {
      const conversation = (await messageModel.find({ classId })
        .populate("sender")
        .sort({ createdAt: -1 })
        .limit(10)
        .skip(skip)) as IMessageModel[];

      return conversation;
    } catch (error) {
      throw error;
    }
  }