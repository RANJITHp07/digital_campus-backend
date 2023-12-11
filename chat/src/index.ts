import { connect } from "./infrastructure/config/rabbitmq";
import { httpServer } from "./infrastructure/config/app";
import { connectDB } from "./infrastructure/config/connectdb";
import { RabbitmquserCreate, RabbitmquserUpdate } from "./infrastructure/utils/rabbitmqMiddleware";



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
