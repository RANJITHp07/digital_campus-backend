import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import errorMiddleware from "../../usecase/handler/errorHandler";

export const  createServer = () => {
  
    // Config
    const app = express();

    dotenv.config()
    app.use(express.json());
    app.use(cors());
    app.use(morgan("dev"));



    //error handling middleware
    app.use(errorMiddleware)
   


    return app;
  
};
