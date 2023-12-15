import { IPlan } from "../domain/plan";
import { PlanRepository } from "../infrastructure/repository/planRepository";
import RequestValidator from "../infrastructure/repository/validatorRepository";
import ErrorResponse from "./handler/errorResponse";

export class Planusecase{

    private readonly planrepository:PlanRepository
    private readonly  requestValidator:RequestValidator

    constructor(planRepository:PlanRepository,requestValidator:RequestValidator){
         this.planrepository = planRepository;
         this.requestValidator = requestValidator;
    }

    async createPlan({planName,interval,details}:IPlan){
        try{
         const validation=this.requestValidator.validateRequiredFields(
            {planName,interval,details},
            ["planName","interval","details"]
            );
          
            if (!validation.success) {
                throw ErrorResponse.badRequest(validation.message as string)
            }
    

         const newPlan=await this.planrepository.create({planName,interval,details})
         return {
            status:200,
            success:true,
            message:newPlan
         }
        }catch(err){
            throw err
        }
    }

    async getPlain(){
         try{
           const plans=await this.planrepository.getPlan()
           return {
            status:200,
            success:true,
            data:plans
           }
         }catch(err){
            throw err
         }
    }

    async updatePlan({id,update}:{id:string,update:Partial<IPlan>}){
        try{
            const validation=this.requestValidator.validateRequiredFields(
                {id,update},
                ["id","update"]
                );
              
                if (!validation.success) {
                    throw ErrorResponse.badRequest(validation.message as string)
                }

            const plan=await this.planrepository.update(id,update) 
            if(plan) return {
                status:200,
                success:true,
                message:plan
            }
            throw ErrorResponse.badRequest("No such document")
        }catch(err){
            throw err
        }
    }


    async deletePlan(id:string){
        try{
            const validation=this.requestValidator.validateRequiredFields(
                {id},
                ["id"]
                );
              
                if (!validation.success) {
                    throw ErrorResponse.badRequest(validation.message as string)
                }
                const plan=await this.planrepository.delete(id) 
                if(plan) return {
                    status:200,
                    success:true,
                    message:plan
                }
                throw ErrorResponse.badRequest("No such document")

        }catch(err){
            throw err
        }
    }

}