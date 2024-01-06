import express, { Express } from 'express';
import cors from 'cors';
import http from 'http';
import morgan from 'morgan';
import userRoute from '../route/userRoute';
import errorMiddleware from '../../usecaseLayer/handler/errorHandler';
import adminRoute from '../route/adminRoute';
import { SocketManager } from '../repository/services/socketRepository';
import { userRepository } from '../route/injection/userInjection';

const app: Express = express();

// Middleware
app.use(express.json());

// CORS setup
const corsOptions = {
    origin: 'https://digital-campus-9dqcqf3i9-ranjithp07s-projects.vercel.app',
    methods: ['GET', 'PATCH', 'PUT','POST'], 
    optionsSuccessStatus: 204, 
};

app.use(cors(corsOptions));
app.use(morgan('dev'));

// HTTP server setup
const httpServer = http.createServer(app);

// Socket.io connection setup
const socket = new SocketManager(httpServer, userRepository);

// Routes
app.use('/v3/api/auth/user', userRoute);
app.use('/v3/api/auth/admin', adminRoute);

// Error handling middleware
app.use(errorMiddleware);

export { httpServer };
