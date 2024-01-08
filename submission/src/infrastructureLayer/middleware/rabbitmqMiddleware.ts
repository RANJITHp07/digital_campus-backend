import { AssignmentRepository } from "../respository/assignment";
import Listener from "../respository/listenrepository";


const repository=new AssignmentRepository();
const listener=new Listener()

async function RabbitmqassignmentCreate(){
    try{
        await listener.listen("assignmentExchange","createAssignment",'createAssignment',async (data:any)=>{
            console.log(data)
             let d={_id:data.id,...data}
            await repository.create(d)
    })
    }catch(err){
        throw err
    }
    
}

export {RabbitmqassignmentCreate}