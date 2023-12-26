import AssignmentModel from "../model/assignment"

export class Assignment{

    async create(assignment:any):Promise<string>{
        try{
           await AssignmentModel.create(assignment)
           return 'assignment created'
        }catch(err){
            throw err
        }
    }

    async update(id:string,update:any){
        try{
           const updateAssignment=await AssignmentModel.findByIdAndUpdate(id,{$set:update})
           return updateAssignment ? 'assignment updated' :  null
           
        }catch(err){
            throw err
        }
    }

    async find(id:string){
        try{
           const assignment= await AssignmentModel.findById(id)
           return assignment
        }catch(err){
            throw err
        }
    }
}