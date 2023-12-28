import { Users } from "../entities/user";
import { UserRepository } from "../repository/queries/userRepository";
import Responder from "../repository/rabbitmq/client";

const repository=new UserRepository(Users);
const responder=new Responder()

async function RabbitmquserDetails(){
responder.listenForRequests('classroomExchange','studentDetails', "participant", async (data) => {
        const admin=await repository.getAllParticipants(data.adminId)
        const user=await repository.getAllParticipants(data.studentId)
       return {admin,user};
})
}

export {RabbitmquserDetails}