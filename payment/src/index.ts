import { createServer } from "./infrastructure/config/app";
import { db } from "./infrastructure/config/db"


const app=createServer();


db().then(()=>{
    app?.listen(6003,()=>{
        console.log(`connected to the server`)
    })
})