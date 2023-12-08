import { Users } from "../entities/user";
import Listener from "../repository/listenrepository";
import Publisher from "../repository/publishrepository";
import { UserRepository } from "../repository/userRepository";

const repository=new UserRepository(Users);
const listener=new Listener()
const publisher=new Publisher()

async function RabbitmquserDetails(){
    await listener.listen("exchange4","details",async (data:any)=>{
     const admin=await repository.getAllparticipants(data.adminId)
     const user=await repository.getAllparticipants(data.studentId)
     await publisher.publish("exchange5", "participants",{admin,user})
})
}

export {RabbitmquserDetails}