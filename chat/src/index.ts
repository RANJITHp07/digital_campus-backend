import cluster from 'cluster';
import os from 'os';
import { httpServer } from "./infrastructureLayer/config/app";
import { connectDB } from "./infrastructureLayer/config/connectdb";
import {
  RabbitmquserCreate,
  RabbitmquserUpdate,
} from "./infrastructureLayer/utils/rabbitmqMiddleware";

const startServer = async (): Promise<void> => {
  const PORT = process.env.PORT || 3000;

  // Check if the current process is the master
  if (cluster.isMaster) {
    const numCPUs = require("os").cpus().length;
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    // Listen for worker exit event and respawn a new worker
    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died`);
      cluster.fork();
    });
  } else {
    // Connect to the database
    await connectDB();

    // Listen to the RabbitMQ queues
    await RabbitmquserCreate();
    await RabbitmquserUpdate();

    // Start the HTTP server
    const app = httpServer;

    app?.listen(PORT, () => {
      console.log(
        `connected to the server on port ${PORT}`
      );
    });
  }
};

startServer();
