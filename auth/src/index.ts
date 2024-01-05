import { db } from "./infrastructureLayer/config/db"
import { RabbitmquserDetails } from "./infrastructureLayer/utils/rabbitmqMiddleware";
import { httpServer } from "./infrastructureLayer/config/app";


const startServer = async ()=> {
   const PORT = process.env.PORT || 3000; // Specify a default port or use environment variable

   //db connection
    // await db();

    // // // doing rabbitmq request return pattern
    await RabbitmquserDetails();

    const app = httpServer

    app?.listen(PORT, () => {
      console.log("Connected to the server");
    });
 
};

startServer();
