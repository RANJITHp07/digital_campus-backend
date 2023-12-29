import { createServer } from "./infrastructureLayer/config/app";
import { db } from "./infrastructureLayer/config/db"

const bootstrap=async()=>{
    const port=process.env.PORT || 3000
    const app=await createServer();

    db().then(()=>{
    
        app?.listen(4000,()=>{
            console.log(`connected to the server`)
        })
    })
}

bootstrap()
