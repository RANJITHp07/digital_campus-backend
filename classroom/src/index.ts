import { RabbitmquserUpdate } from "./infrastructureLayer/middleware/utils/rabbitmqMiddleware";
import { createServer } from "./infrastructureLayer/config/app";
import { db } from "./infrastructureLayer/config/db";


const startServer = async () => {
  try {
    await db();
    await RabbitmquserUpdate()

    const app = await createServer();

    app?.listen(5000, () => {
      console.log("Connected to the server");
    });
  } catch (err) {
    console.error("Error starting the server:", err);
  }
};

startServer();
