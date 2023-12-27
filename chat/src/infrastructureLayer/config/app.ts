import express, { Express } from "express";
import cors from "cors";
import http from 'http';
import morgan from 'morgan';
import { SocketManager } from "../repository/queries/socketRepository";
import MessageRoute from "../routes/messageRoute"
import UserRepository from "../repository/queries/userRepository";



  const app: Express = express();
  app.use(express.json());
  app.use(cors());
  app.use(morgan("dev"));

  const httpServer = http.createServer(app);
//socket.io connection
const repository=new UserRepository('')
const socket=new SocketManager(httpServer,repository)

//routes
app.use("/v1/api/chat",MessageRoute)



  export {httpServer}

