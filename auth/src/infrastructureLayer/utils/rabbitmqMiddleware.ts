// import { Users } from "../entities/user";
// import Listener from "../repository/rabbitmq/listenrepository";
// import Publisher from "../repository/rabbitmq/publishrepository";
// import { UserRepository } from "../repository/queries/userRepository";
// import Responder from "../repository/rabbitmq/client";

// const repository=new UserRepository(Users);
// const responder=new Responder()

// async function RabbitmquserDetails(){
// responder.listenForRequests('classroomExchang','studentDetails', "participant", async (data) => {
//     console.log(data)
//         const admin=await repository.getAllparticipants(data.adminId)
//         const user=await repository.getAllparticipants(data.studentId)
//        return {admin,user};
// })
// }

// export {RabbitmquserDetails}