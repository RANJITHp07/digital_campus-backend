import express from "express";
import cors from "cors";
import morgan from "morgan";
import session, { SessionOptions } from 'express-session';
import dotenv from "dotenv";
import userRoute from "../route/userRoute"

export const  createServer = () => {
  
    // Config
    const app = express();

    dotenv.config()
    app.use(express.json());
    app.use(cors());
    app.use(morgan("dev"));

    //session configuration
    const sessionOptions: SessionOptions = {
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false, 
        maxAge: 3600000, 
      },
    };

    app.use(session(sessionOptions));


    //routes
    app.use("/v1/api/auth/user",userRoute)


  
   


    return app;
  
};
