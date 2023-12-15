import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import userRoute from "../route/userRoute"
import errorMiddleware from "../../usecaseLayer/handler/errorHandler";
import adminRoute from "../route/adminRoute"

export const  createServer = () => {
  
    // Config
    const app = express();

    dotenv.config()
    app.use(express.json());
    app.use(cors());
    app.use(morgan("dev"));



    //routes
    app.use("/v1/api/auth/user",userRoute)
    app.use("/v1/api/auth/admin",adminRoute)



    //error handling middleware
    app.use(errorMiddleware)
   


    return app;
  
};
