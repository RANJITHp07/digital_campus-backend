import { Next, Req, Res } from "../infrastructureLayer/types/expressTypes";
import { Planusecase } from "../usecaseLayer/usecase/planusecase";

export class PlanController{
    private readonly planusecase:Planusecase


    constructor(planusecase:Planusecase){
         this.planusecase = planusecase;
    }

    async createPlan(req:Req,res:Res,next:Next){
        try{
            const newPlan=await this.planusecase.createPlan(req.body)
            res.status(newPlan.status).json({
                success: newPlan.success,
                message: newPlan.message
            })
        }catch(err){
            next(err)
        }
    }

    async getPlans(req:Req,res:Res,next:Next){
        try{
            const plans=await this.planusecase.getPlain();
            res.status(plans.status).json({
                success: plans.success,
                data: plans.data
            })
        }catch(err){
            next(err)
        }
    }

    async deletePlan(req:Req,res:Res,next:Next){
        try{
           const deletedPlans=await this.planusecase.deletePlan(req.params.id)
           res.status(deletedPlans.status).json({
           success:deletedPlans.success,
           message:deletedPlans.message
           })
        }catch(err){
            next(err)
        }
    }

    async updatePlan(req:Req,res:Res,next:Next){
      try{
         const updatedPlans=await this.planusecase.updatePlan(req.body)
         res.status(updatedPlans.status).json({
            success:updatedPlans.success,
            message:updatedPlans.message
            })
      }catch(err){
        next(err)
      }
    }
}