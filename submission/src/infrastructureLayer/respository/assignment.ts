import AssignmentModel from "../model/assignment"

export class Assignment{

     

    async create(assignment:any){
        try{
           await AssignmentModel.create(assignment)
        }catch(err){
            console.log(err)
        }
    }

    async update(id:string,update:any){
        try{
           await AssignmentModel.findByIdAndUpdate(id,{$set:update})
        }catch(err){
            throw err
        }
    }

    async find(id:string){
        try{
           const a= await AssignmentModel.findById(id)
           return a
        }catch(err){
            throw err
        }
    }
}