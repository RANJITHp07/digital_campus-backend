import { IAssigmentRepository } from "../../interface/assignmentRepository"

export const getDistinctMaintopic=async(
    assignmentRepository: IAssigmentRepository,
    id:string)=>{
    try{
        const topics=await assignmentRepository.distinctTopic(id)
        return {
            mainTopic:topics
        }
    }catch(err){
        throw err
    }
 }