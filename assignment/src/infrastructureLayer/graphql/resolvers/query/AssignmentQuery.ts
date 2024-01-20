import { authenticate } from "@auth-middlewares/common";
import { controller,errorHandler } from "../../injection/assignment"
import { Request } from "express";

export const assignmentQueries={
    async  getAllassignment(_:unknown,args:{id:string},context:{req:Request}){
        try{
            const user=authenticate(context)
            if(user){
            const assignment = await controller.getAllassignments(_,args)
             return assignment
            }
        }catch(err){
            errorHandler.apolloError(err)
        }
    },
    
    async  getgroupedAssignment(_:unknown,args:{id:string},context:any){
        try{
            const assignment = await controller.getgroupedAssignments(_,args)
             return assignment
        }catch(err){
            errorHandler.apolloError(err)
        }
    },

    async getOneassignment(_:unknown,args:{id:string}){
        try{
            const assignment = await controller.getOneassignments(_,args)
             return assignment
        }catch(err){
            errorHandler.apolloError(err)
        }
    },

    async getdistinctmainTopic(_:unknown,args:{id:string}){
        try{
            const assignment = await controller.getdistinctmainTopic(_,args)
             return assignment
        }catch(err){
            errorHandler.apolloError(err)
        }
    },

    async getDueDates(_:unknown,args:{id:string}){
        try{
            const assignment = await controller.findAssignment(_,args)
             return assignment
        }catch(err){
            errorHandler.apolloError(err)
        }
    }
}