import { Server, Socket } from "socket.io";
import { createServer, Server as HttpServer } from "http";
import { UserRepository } from "../queries/userRepository";

export class SocketManager {
  private httpServer: HttpServer;
  private io: Server;
  private userResponsitory: UserRepository

  constructor(httpServer: HttpServer,userRepository: UserRepository) {
    this.httpServer = httpServer;
    this.userResponsitory=userRepository
    this.io = new Server(httpServer, {
      cors: {
        origin: "http://localhost:3000",
      },
    });

    this.io.on("connection", this.handleConnection);
  }

  private handleConnection = (socket: Socket): void => {

    socket.on("join-room",(email)=>{
      console.log("a user connected.");
      socket.join(email);
    })


    socket.on("isBlocked", async ({ email}: { email:string }) => {
      let user = await this.userResponsitory.findUser(email)
      if(user && user.id){
        socket.broadcast.to(email).emit("responseIsBlocked", {isBlocked:user.blocked});
      }
    });

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
