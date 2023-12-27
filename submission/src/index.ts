import {createServer} from "./infrastructureLayer/config/app";
import { db } from "./infrastructureLayer/config/db";
import { RabbitmqassignmentCreate } from "./middleware/rabbitmqMiddleware";



const startServer = async (): Promise<void> => {
  const port=3000
    await db();
    await RabbitmqassignmentCreate()

    const app = createServer()

    app?.listen(port, () => {
      console.log("Connected to the server");
    });
 
};

startServer();
