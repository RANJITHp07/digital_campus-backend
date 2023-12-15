import { createServer } from "./infrastructureLayer/config/app";
import { db } from "./infrastructureLayer/config/db"
import { RabbitmquserDetails } from "./infrastructureLayer/utils/rabbitmqMiddleware";


const app=createServer();

db().then(async()=>{
    await RabbitmquserDetails()
    app?.listen(4000,()=>{
        console.log(`connected to the server`)
    })
})