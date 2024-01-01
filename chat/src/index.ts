import { httpServer } from "./infrastructureLayer/config/app";
import { connectDB } from "./infrastructureLayer/config/connectdb";
import { RabbitmquserCreate, RabbitmquserUpdate } from "./infrastructureLayer/utils/rabbitmqMiddleware";



const startServer = async (): Promise<void> => {
   const port=process.env.PORT || 3000
    
    //db connection
    await connectDB();

    //to listen to the rabbitmq queue
    await RabbitmquserCreate()
    await RabbitmquserUpdate()

    const app = httpServer

    app?.listen(PORT, () => {
      console.log("Connected to the server");
    });
 
};

startServer();
