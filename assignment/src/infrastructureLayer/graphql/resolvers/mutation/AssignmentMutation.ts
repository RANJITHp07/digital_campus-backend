import { IAssigment } from "../../../../domainLayer/assignment"
import { controller,errorHandler } from "../../injection/assignment"
import { authenticate } from "@auth-middlewares/common"

export const assignmentMutations={

    async createAssignment(_:unknown,args:{assignment:IAssigment},context:any){
        try{
            // const user=authenticate(context)
            if(true){
                const newAssignment = await controller.create(_,args)
                return newAssignment
            }
        }catch(err){
          errorHandler.apolloError(err)
        }
  },

  async deleteAssignment(_:unknown,args:{id:string}){
      try{
          const deletedAssignment = await controller.deleteAssignment(_,args)
          return deletedAssignment
      }catch(err){
          errorHandler.apolloError(err)
      }
  },

  async updateAssignment(_:unknown,args:{id:string,update:Partial<IAssigment>}){
      try{
          const updatedAssignment = await controller.updateAssignment(_,args)
          return updatedAssignment
      }catch(err){
          console.log(err)
          errorHandler.apolloError(err)
      }
  }
}