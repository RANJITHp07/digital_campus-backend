import { IPlan } from "../../domain/plan";
import PlanModel from "../model/planModel";

export class PlanRepository {
   constructor(planModel:any){}

   //to create the plan
   async create(plan:IPlan):Promise<string>{
    try{
         await PlanModel.create(plan)
         return "Successfully created"
    }catch(err){
        throw err
    }
   }

   //to get all the plans
   async getPlan():Promise<IPlan[]>{
    try{
      const plans=await PlanModel.find();
      return plans
    }catch(err){
      throw err
    }
   }

   //to update the plans
   async  update(id:string,update:Partial<IPlan>):Promise<string | null>{
    try{
         const updatePlan=await PlanModel.findByIdAndUpdate(id,{$set:update})
         return updatePlan ?
         "successfully updated"
         :
         null
    }catch(err){
        throw err
    }
   }

   //to delete the plans
   async  delete(id:string,update:Partial<IPlan>):Promise<string | null>{
    try{
         const updatePlan=await PlanModel.findByIdAndUpdate(id,{$set:update})
         return updatePlan ?
         "successfully updated"
         :
         null
    }catch(err){
        throw err
    }
   }
}