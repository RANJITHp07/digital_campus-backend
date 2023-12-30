import { Users } from "../entities/user";
import { UserRepository } from "../repository/queries/userRepository";
import Responder from "../repository/rabbitmq/client";

interface Data{
        adminId:number[],
        studentId:number[]
}

const repository=new UserRepository(Users);
const responder=new Responder()

async function RabbitmquserDetails(){
responder.listenForRequests('classroomExchange','studentDetails', "participant", async (data:Data) => {
        if(data.adminId && data.studentId){
                const admin=await repository.getAllParticipants(data.adminId);
                const user=await repository.getAllParticipants(data.studentId);
               return {admin,user};
        }

        return {admin:[],user:[]}
})
}

export {RabbitmquserDetails}