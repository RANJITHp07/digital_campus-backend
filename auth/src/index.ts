import { db } from "./infrastructureLayer/config/db"
import { RabbitmquserDetails } from "./infrastructureLayer/utils/rabbitmqMiddleware";
import { httpServer } from "./infrastructureLayer/config/app";
import connect from "./infrastructureLayer/config/rabbitmq";




const startServer = async (): Promise<void> => {
    await db();
    // await connect()
    await RabbitmquserDetails()

    const app = httpServer

    app?.listen(4000, () => {
      console.log("Connected to the server");
    });
 
};

startServer();
