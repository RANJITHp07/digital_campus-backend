import IMessage from "../../domainLayer/message";

export interface Response{
  status: number;
  success: boolean;
  message?: string;
  data?: IMessage;
}
