import { RabbitmquserUpdate } from "./infrastructureLayer/middleware/utils/rabbitmqMiddleware";
import { createServer } from "./infrastructureLayer/config/app";
import { db } from "./infrastructureLayer/config/db";

const startServer = async () => {
  try {
    await db();

    const app = await createServer()

    app?.listen(3000, () => {
      console.log("Connected to the server");
    });
    await RabbitmquserUpdate()
  } catch (err) {
    console.error("Error starting the server:", err);
  }
};

startServer();
