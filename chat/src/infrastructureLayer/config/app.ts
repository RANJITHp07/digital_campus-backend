import express, { Express } from "express";
import cors from "cors";
import http from "http";
import morgan from "morgan";
import { SocketManager } from "../repository/queries/socketRepository";
import MessageRoute from "../routes/messageRoute";
import { userrepository } from "../routes/injection/injection";

const app: Express = express();
app.use(express.json());

// CORS setup
const corsOptions = {
  origin: "https://digital-campus.vercel.app",
  methods: ["GET", "PATCH", "PUT", "POST"],
  optionsSuccessStatus: 204,
};

app.use(cors());
app.use(morgan("dev"));

const httpServer = http.createServer(app);

//socket.io connection
const socket = new SocketManager(httpServer, userrepository);

//routes
app.use("/v1/api/chat", MessageRoute);

export { httpServer };
