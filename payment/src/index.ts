import { createServer } from "./infrastructureLayer/config/app";
import { db } from "./infrastructureLayer/config/db"


const app=createServer();


db().then(()=>{
    app?.listen(6003,()=>{
        console.log(`connected to the server`)
    })
})