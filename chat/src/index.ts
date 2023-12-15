import { httpServer } from "./infrastructureLayer/config/app";
import { connectDB } from "./infrastructureLayer/config/connectdb";
import { RabbitmquserCreate, RabbitmquserUpdate } from "./infrastructureLayer/utils/rabbitmqMiddleware";



const startServer = async (): Promise<void> => {
    await connectDB();
    await RabbitmquserCreate()
    await RabbitmquserUpdate()

    const app = httpServer

    app?.listen(8000, () => {
      console.log("Connected to the server");
    });
 
};

startServer();
