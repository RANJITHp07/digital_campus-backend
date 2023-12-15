import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import errorMiddleware from "../../usecase/handler/errorHandler";
import planRoute from '../routes/planRoute'
import paymentRoute from '../routes/paymentRoute'

export const  createServer = () => {
  
    // Config
    const app = express();

    dotenv.config()
    app.use(express.json());
    app.use(cors());
    app.use(morgan("dev"));


    //routes
    app.use("/v1/api/payment/plan",planRoute)
    app.use("/v1/api/payment",paymentRoute)

    //error handling middleware
    app.use(errorMiddleware)
   


    return app;
  
};
