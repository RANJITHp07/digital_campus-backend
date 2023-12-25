import {createServer} from "./infrastructureLayer/config/app";
import { db } from "./infrastructureLayer/config/db";
import { RabbitmqassignmentCreate } from "./middleware/rabbitmqMiddleware";



const startServer = async (): Promise<void> => {
    await db();
    await RabbitmqassignmentCreate()

    const app = createServer()

    app?.listen(6004
      , () => {
      console.log("Connected to the server");
    });
 
};

startServer();
