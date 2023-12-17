import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { server } from "./graphql";
import {Express} from 'express'



export const  createServer = async() => {
  
    // Config
    const app:Express | any= express();

    await server.start();

    server.applyMiddleware({ app,path:'/classroom' });

    dotenv.config()
    app.use(express.json());
    app.use(cors());
    app.use(morgan("dev"));

    return app as Express;
  
};
