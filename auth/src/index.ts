import { createServer } from "./infrastructure/config/app";
import { db } from "./infrastructure/config/db"
import { RabbitmquserDetails } from "./infrastructure/utils/rabbitmqMiddleware";


const app=createServer();

const rabbitmq=async()=>{
   await RabbitmquserDetails()
}

rabbitmq()

db().then(()=>{
    app?.listen(4000,()=>{
        console.log(`connected to the server`)
    })
})