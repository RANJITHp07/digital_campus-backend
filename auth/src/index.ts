import { db } from "./infrastructureLayer/config/db"
import { RabbitmquserDetails } from "./infrastructureLayer/utils/rabbitmqMiddleware";
import { httpServer } from "./infrastructureLayer/config/app";
import connect from "./infrastructureLayer/config/rabbitmq";




const startServer = async ()=> {
  const port=3000
    await db();
    await RabbitmquserDetails();

    const app = httpServer

    app?.listen(port, () => {
      console.log("Connected to the server");
    });
 
};

startServer();
