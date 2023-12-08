import { createServer } from "./infrastructure/config/app";
import { db } from "./infrastructure/config/db"


const bootstrap=async()=>{
    const app=await createServer();

    db().then(()=>{
    
        app?.listen(6001,()=>{
            console.log(`connected to the server`)
        })
    })
}

bootstrap()
