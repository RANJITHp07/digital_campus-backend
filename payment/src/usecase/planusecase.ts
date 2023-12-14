import { PlanRepository } from "../infrastructure/repository/planRepository";

export class Planusecase{

    private readonly planrepository:PlanRepository

    constructor(planRepository:PlanRepository){
         this.planrepository = planRepository;
    }

    async createPlan(){
        try{

        }catch(err){
            throw err
        }
    }

}