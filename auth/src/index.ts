import { createServer } from "./infrastructure/config/app";
import { db } from "./infrastructure/config/db"
import { RabbitmquserDetails } from "./infrastructure/utils/rabbitmqMiddleware";


const app=createServer();

db().then(async()=>{
    await RabbitmquserDetails()
    app?.listen(4000,()=>{
        console.log(`connected to the server`)
    })
})