import { PlanService } from '../services/plan.service';
import { Plan } from '../models/plan.model';
export declare class PlanController {
    private readonly planService;
    constructor(planService: PlanService);
    createPlan(plan: Plan): Promise<Plan>;
    getPlan(id: string): Promise<Plan>;
    getAllPlans(minPrice?: number, maxPrice?: number): Promise<Plan[]>;
    updatePlan(id: string, plan: Partial<Plan>): Promise<Plan>;
    deletePlan(id: string): Promise<void>;
}
