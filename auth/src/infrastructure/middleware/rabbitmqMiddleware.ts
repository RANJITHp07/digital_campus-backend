import { Users } from "../entities/user";
import Listener from "../repository/listenrepository";
import { UserRepository } from "../repository/userRepository";

const repository=new UserRepository(Users);
const listener=new Listener()

async function RabbitmquserDetails(){
    await listener.listen("exchange4","details",async (data:any)=>{
    await repository.getAllParticipants(data)
})
}

export {RabbitmquserDetails}