import { Server, Socket } from "socket.io";
import { createServer as createHttpServer, Server as HttpServer } from "http";
import ConversationModel from "../model/conversation";
import NotificationRepository from "./notificationRepository";

interface ClassRoom {
  classroomId?:string[]
}

export class SocketManager {
  private httpServer: HttpServer;
  private io: Server;
  private classrooms: ClassRoom= {};

  constructor(httpServer: HttpServer) {
    this.httpServer = httpServer;
    this.io = new Server(httpServer, {
      cors: {
        origin: "http://localhost:8000"
      },
    });

    this.io.on("connection", this.handleConnection);
  }

  private handleConnection = (socket: Socket): void => {
    console.log("a user connected.");
     
    socket.on("addClassroom", (classRoomId: string,userId:string) => {
       if(this.classrooms[classRoomId]){
          this.classrooms[classRoomId]=[...this.classrooms[classRoomId],userId]
       }else{
        this.classrooms[classRoomId]=[userId]
       }
      this.io.emit("getClassroom",this.classrooms[classRoomId].length);
    });

  }

  start = (): void => {
    this.httpServer.listen(3000, () => {
      console.log("Socket server listening on port 6005");
    });
  };
}
