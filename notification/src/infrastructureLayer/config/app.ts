import express, { Express } from "express";
import cors from "cors";
import http from "http";
import morgan from "morgan";
import notificationRoute from '../routes/notificationRoutes'
import errorMiddleware from "../../usecaseLayer/handler/errorHandler";
import { SocketManager } from "../repository/services/socketRepository";

const app: Express = express();

// Middleware
app.use(express.json());

// CORS setup
const corsOptions = {
  origin: ["https://digital-campus.vercel.app","http://localhost:3000"],
  methods: ["GET", "DELETE"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(morgan("dev"));

// HTTP server setup
const httpServer = http.createServer(app);

// Socket.io connection setup
const socket = new SocketManager(httpServer);

// Routes
app.use("/v1/api/notification", notificationRoute);

// Error handling middleware
app.use(errorMiddleware);

export { httpServer };
