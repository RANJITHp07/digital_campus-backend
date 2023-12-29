import Listener from "../../repository/rabbitmq/listenrepository";
import { ClassRoomRepository } from "../../repository/queries/classroomRepository";


const repository=new ClassRoomRepository('');
const listener=new Listener()


async function RabbitmquserUpdate(){
    try{
        await listener.listen("authExchange","updateProfile",'updateProfile',async (data:any)=>{
            const update={
                profile:data.profile
            }
            const newUser=await repository.updateProfile(data.id,update)
            console.log(newUser)
    })
    }catch(err){
        throw err
    }
    
}

export {RabbitmquserUpdate}