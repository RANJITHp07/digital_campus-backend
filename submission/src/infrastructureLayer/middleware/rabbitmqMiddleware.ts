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
    await listener.listen("assignmentExchange","deleteAssignment",'updateAssignment',async (data:any)=>{
    await repository.update(data.id,data.updateSubmissio)
    })
   }catch(err){
    throw err
   }

}    

export {RabbitmqassignmentCreate,RabbitmqassignmentDelete,RabbitmqassignmentUpdate}