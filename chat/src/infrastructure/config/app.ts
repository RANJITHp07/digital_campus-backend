import express, { Express } from "express";
import cors from "cors";
import http from 'http';
import morgan from 'morgan';
import { SocketManager } from "../repository/socketRepository";



  const app: Express = express();
  app.use(express.json());
  app.use(cors());
  app.use(morgan("dev"));

  const httpServer = http.createServer(app);
//socket.io connection
 const socket=new SocketManager(httpServer)
//  socket.start()



  export {httpServer}

