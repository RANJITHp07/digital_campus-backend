import { AssignmentController } from "../../../adapter/assignmentAdapter";
import { IAssigment } from "../../../entites/assignment";
import { AssignmentUsecase } from "../../../usecase/assignmentusecase";
import { ErrorHandler } from "../../middleware/error/userErrorhandler";
import { AssignmentRepository } from "../../repository/assignmentRepository";

//factory pattern
const repository =new AssignmentRepository();
const errorHandler=new ErrorHandler()
const usecase=new AssignmentUsecase(repository,errorHandler);
const controller=new AssignmentController(usecase,errorHandler)

export const resolver={
    Query:{
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
        }
    },

    Mutation:{
        async createAssignment(_:unknown,args:{assignment:IAssigment}){
              try{
                 const newAssignment = await controller.create(_,args)
                 return newAssignment
              }catch(err){
                errorHandler.apolloError(err)
              }
        }
    }
}