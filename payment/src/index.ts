import {createServer} from "./infrastructureLayer/config/app";
import { db } from "./infrastructureLayer/config/db";
import { RabbitmquserCreate,} from "./infrastructureLayer/utils/rabbitmqMiddleware";



const startServer = async (): Promise<void> => {
    await db();
    await RabbitmquserCreate()

    const app = createServer()

    app?.listen(5004, () => {
      console.log("Connected to the server");
    });
 
};

startServer();
