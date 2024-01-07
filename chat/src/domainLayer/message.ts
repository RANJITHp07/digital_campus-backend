export default interface IMessage {
  classId: string;
  sender?: string ;
  text: {
    type: string;
    text: string;
    desc?:string
  };
}
