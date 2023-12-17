import Listener from "../repository/rabbitmq/listenrepository";
import {UserRepository} from "../repository/queries/userRepository";


const repository=new UserRepository();
const listener=new Listener()

async function RabbitmquserCreate(){
    try{
        await listener.listen("authExchange","createroute",async (data:any)=>{
            const user={
                username:data.username,
                email:data.email
            }
            const newUser=await repository.create(user)
            console.log(newUser)
    })
    }catch(err){
        throw err
    }
    
}


export {RabbitmquserCreate}