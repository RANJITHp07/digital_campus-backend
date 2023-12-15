import express,{Application, Express} from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { server } from "./graphql";
import assignmentRouter from "../route/assignmentRoute"



export const  createServer = async() => {
  
    // Config
    const app:any= express();

    await server.start();

    server.applyMiddleware({ app,path:'/assignment' });

    dotenv.config()
    app.use(express.json());
    app.use(cors());
    app.use(morgan("dev"));
   

    // app.use("/v1/assignment",assignmentRouter)


    return app;
  
};
