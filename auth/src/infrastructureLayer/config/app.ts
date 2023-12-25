import express, { Express } from "express";
import cors from "cors";
import http from 'http';
import morgan from 'morgan';
import userRoute from "../route/userRoute"
import errorMiddleware from "../../usecaseLayer/handler/errorHandler";
import adminRoute from "../route/adminRoute"
import { SocketManager } from "../repository/services/socketRepository";
import { UserRepository } from "../repository/queries/userRepository";



  const app: Express = express();
  app.use(express.json());
  app.use(cors());
  app.use(morgan("dev"));

  const httpServer = http.createServer(app);
//socket.io connection
const repository=new UserRepository('')
const socket=new SocketManager(httpServer,repository); 


    //routes
    app.use("/v1/api/auth/user",userRoute)
    app.use("/v1/api/auth/admin",adminRoute)



    //error handling middleware
    app.use(errorMiddleware)


  export {httpServer}

