import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { ClassRoomNotificationRepository } from "../queries/notification";
import ClassroomNotificationModel from "../../model/classRoomNotification";
import { IClassroomNotification } from "../../../domainLayer/classroomNotification";

export class SocketManager {
  private httpServer: HttpServer;
  private io: Server;

  constructor(httpServer: HttpServer) {
    this.httpServer = httpServer;
    this.io = new Server(httpServer, {
      cors: {
        origin:
          "https://digital-campus.vercel.app",
      },
      path: "/socket-notification/",
    });

    this.io.on("connection", this.handleConnection);
  }

  private handleConnection = (socket: Socket): void => {
    socket.on("join-room", (userId:string) => {
      console.log("A user connected.");
      socket.join(userId);
    });

    // to send notification
    socket.on("acceptNotification", async ({ notification }: { notification: IClassroomNotification }) => {
      try {
        const repository=new ClassRoomNotificationRepository(ClassroomNotificationModel)
        const createNotification=await repository.create(notification)
        if (createNotification) {
          this.io
            .to(notification.user_id)
            .emit("sendNotification", { notification:notification});
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected!");
    });
  };

  start = (): void => {
    this.httpServer.listen(3000, () => {
      console.log("Socket server listening on port 6005");
    });
  };
}
