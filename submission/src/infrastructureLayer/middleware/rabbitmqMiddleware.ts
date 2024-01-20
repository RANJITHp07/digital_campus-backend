
import AssignmentModel from "../model/assignment";
import { AssignmentRepository } from "../respository/queries/assignmentRepository";
import Listener from "../respository/rabbitmq/listenrepository";


const repository=new AssignmentRepository(AssignmentModel);
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


async function RabbitmqassignmentDelete(){
    try{
        await listener.listen("assignmentExchange","deleteAssignment",'deleteAssignment',async (data:any)=>{
        await repository.delete(data.id)
    })
    }catch(err){
        throw err
    }    
    
}

async function RabbitmqassignmentUpdate(){
   try{
    await listener.listen("assignmentExchange","updateAssignment",'updateAssignment',async (data:any)=>{
    await repository.update(data.id,data.updateSubmissio)
    })
   }catch(err){
    throw err
   }

}    

export {RabbitmqassignmentCreate,RabbitmqassignmentDelete,RabbitmqassignmentUpdate}