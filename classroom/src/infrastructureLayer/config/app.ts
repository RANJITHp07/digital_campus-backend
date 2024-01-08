import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { server } from "./graphql";
import { Express } from "express";

export const createServer = async () => {
  // Config
  const app: Express | any = express();

  await server.start();

  server.applyMiddleware({ app, path: "/classroom" });

  dotenv.config();
  app.use(express.json());

  // CORS setup
  const corsOptions = {
    origin: "https://digital-campus.vercel.app",
    methods: ["GET", "PATCH", "PUT", "POST", "DELETE"],
    optionsSuccessStatus: 204,
  };

  app.use(cors(corsOptions));
  app.use(morgan("dev"));

  return app as Express;
};
