import {createServer} from "./infrastructureLayer/config/app";
import { db } from "./infrastructureLayer/config/db";
import { RabbitmquserCreate,} from "./infrastructureLayer/utils/rabbitmqMiddleware";

const startServer = async (): Promise<void> => {
    const PORT=process.env.PORT || 3000
    await db();

    // await RabbitmquserCreate()

    const app = createServer()

    app?.listen(PORT, () => {
      console.log("Connected to the server");
    });
 
};

startServer();
