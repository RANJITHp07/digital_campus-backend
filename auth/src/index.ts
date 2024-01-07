import cluster from 'cluster';
import os from 'os';
import { db } from "./infrastructureLayer/config/db";
import { RabbitmquserDetails } from "./infrastructureLayer/utils/rabbitmqMiddleware";
import { httpServer } from "./infrastructureLayer/config/app";

const startServer = async () => {
  const PORT = process.env.PORT || 3000;

  if (cluster.isMaster) {
    const numCPUs = os.cpus().length;
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
    await db();

    // Perform RabbitMQ request-return pattern
    await RabbitmquserDetails();

    // Start the HTTP server
    const app = httpServer;

    app?.listen(PORT, () => {
      console.log(` connected to the server on port ${PORT}`);
    });
  }
};

startServer();
