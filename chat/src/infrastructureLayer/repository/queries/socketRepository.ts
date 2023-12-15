import { Server, Socket } from "socket.io";
import { createServer as createHttpServer, Server as HttpServer } from "http";
import UserRepository from "./userRepository";
import MessageRepository from "./messageRespository";
import IMessage from "../../../domainLayer/message";

interface ClassRoom {
  [classRoomId: string]: {
    sockets: string[];
  };
}

export class SocketManager {
  private httpServer: HttpServer;
  private io: Server;
  private readonly userRepository: UserRepository;

  constructor(httpServer: HttpServer, userRepository: UserRepository) {
    this.userRepository = userRepository;
    this.httpServer = httpServer;
    this.io = new Server(httpServer, {
      cors: {
        origin: "http://localhost:3000",
      },
    });

    this.io.on("connection", this.handleConnection);
  }

  private handleConnection = (socket: Socket): void => {

    socket.on("join-room",(classRoomId)=>{
      console.log("a user connected.");
      socket.join(classRoomId);
    })


    socket.on("sendMessage", async ({ classId, message }: { classId: string; message: IMessage }) => {
      let user = await this.userRepository.finduser(message.sender as string);
      if(user){
        const m={...message,sender:user._id}
        const repository = new MessageRepository('');
        const newMessage=await repository.create(m);
        console.log(newMessage);
        socket.broadcast.to(classId).emit("getMessage", newMessage);
      }
    });

    socket.on("typing-started",({ classId, name }: { classId: string;name: string;})=>{
        socket.broadcast.to(classId).emit("typing-started-from-server",name)
      
  })

  socket.on("typing-stoped",({ classId,name }: { classId:string;name: string;})=>{
        socket.broadcast.to(classId).emit("typing-stoped-from-server")

      
  })

    socket.on("disconnect", () => {
      console.log("a user disconnected!");
    });
  };

  start = (): void => {
    this.httpServer.listen(8000, () => {
      console.log("Socket server listening on port 6005");
    });
  };
}