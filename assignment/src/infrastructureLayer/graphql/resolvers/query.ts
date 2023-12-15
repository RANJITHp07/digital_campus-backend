import { controller,errorHandler } from "../injection/injection"

export const assignmentQueries={
    async  getAllassignment(_:unknown,args:{id:string}){
        try{
            const assignment = await controller.getAllassignments(_,args)
             return assignment
        }catch(err){
            errorHandler.apolloError(err)
        }
    },
    
    async  getgroupedAssignment(_:unknown,args:{id:string}){
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