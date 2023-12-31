import { RabbitmquserUpdate } from "./infrastructureLayer/middleware/utils/rabbitmqMiddleware";
import { createServer } from "./infrastructureLayer/config/app";
import { db } from "./infrastructureLayer/config/db";

const startServer = async () => {
  try {
    const port=process.env.PORT || 3000

    //database connection
    await db();

    //rabbitmq listening to the incoming queue
    await RabbitmquserUpdate()

    const app = await createServer()

    app?.listen(PORT, () => {
      console.log("Connected to the server");
    });
    
  } catch (err) {
    console.error("Error starting the server:", err);
  }
};

startServer();
