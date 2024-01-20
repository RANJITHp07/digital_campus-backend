import { IAssignment } from "../../../../domainLayer/assignment"
import { controller,errorHandler } from "../../injection/assignment"
import { authenticate } from "@auth-middlewares/common"
import {Request} from 'express'

interface MyContext {
  user: Request;
}

export const assignmentMutations={

    async createAssignment(_:unknown,args:{assignment:IAssignment},context:MyContext){
        try{
            const user=authenticate(context)
            if(user){
                const newAssignment = await controller.create(_,args)
                return newAssignment
            }
        }catch(err){
          errorHandler.apolloError(err)
        }
  },

  async deleteAssignment(_:unknown,args:{id:string},context:MyContext){
      try{
        const user=authenticate(context)
            if(user){
          const deletedAssignment = await controller.deleteAssignment(_,args)
          return deletedAssignment
            }
      }catch(err){
          errorHandler.apolloError(err)
      }
  },

  async updateAssignment(_:unknown,args:{id:string,update:Partial<IAssignment>},context:MyContext){
      try{
        const user=authenticate(context)
            if(user){
          const updatedAssignment = await controller.updateAssignment(_,args)
          return updatedAssignment
            }
      }catch(err){
          console.log(err)
          errorHandler.apolloError(err)
      }
  }
}