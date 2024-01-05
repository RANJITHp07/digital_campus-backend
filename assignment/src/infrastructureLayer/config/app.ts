import express, { Response ,Request } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { server } from "./graphql";



export const  createServer = async() => {
  
    // Config
    const app:any= express();

    await server.start();

    server.applyMiddleware({ app,path:'/assignment' });

    dotenv.config({
        path:".env"
    })
    app.use(express.json());
    const corsOptions = {
        origin: 'https://digital-campus-9dqcqf3i9-ranjithp07s-projects.vercel.app/',
        methods: ['GET', 'PATCH', 'PUT','POST','DELETE'], 
        optionsSuccessStatus: 204, 
    };
    
    app.use(cors(corsOptions));
    app.use(morgan("dev"));
   

    return app;
  
};
