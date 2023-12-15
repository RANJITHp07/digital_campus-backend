import UserModel from "../model/users";
import Listener from "../repository/rabbitmq/listenrepository";
import UserRepository from "../repository/queries/userRepository";


const repository=new UserRepository(UserModel);
const listener=new Listener()

async function RabbitmquserCreate(){
    try{
        await listener.listen("authExchange","createroute",async (data:any)=>{
            console.log(data)
            const user={
                user_id:data.id,
                username:data.username,
                profile:data.profile ? data.profile : ''
            }
            const newUser=await repository.create(user)
            console.log(newUser)
    })
    }catch(err){
        throw err
    }
    
}

async function RabbitmquserUpdate(){
    try{
        await listener.listen("exchange1","updateProfile",async (data:any)=>{
            const update={
                profile:data.profile
            }
            const newUser=await repository.update(data.id,update)
            console.log(newUser)
    })
    }catch(err){
        throw err
    }
    
}

export {RabbitmquserCreate,RabbitmquserUpdate}