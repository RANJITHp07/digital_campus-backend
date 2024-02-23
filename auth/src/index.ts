import { db } from "./infrastructureLayer/config/db";
import { RabbitmquserDetails } from "./infrastructureLayer/utils/rabbitmqMiddleware";
import { httpServer } from "./infrastructureLayer/config/app";

const startServer = async () => {
  const PORT = process.env.PORT || 3000;

  // Connect to the database
  await db();

  // Perform RabbitMQ request-return pattern
  await RabbitmquserDetails();
  

  // Start the HTTP server
  const app = httpServer;

  
  app?.listen(PORT, () => {
    console.log(` connected to the server on port ${PORT}`);
  });
};

startServer();
