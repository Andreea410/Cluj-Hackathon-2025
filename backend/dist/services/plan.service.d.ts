import { BaseService } from './base.service';
import { Plan } from '../models/plan.model';
import { IPlanRepository } from '../repositories/interfaces/plan.repository.interface';
export declare class PlanService extends BaseService<Plan> {
    private readonly planRepository;
    constructor(planRepository: IPlanRepository);
    createPlan(plan: Plan): Promise<Plan>;
    updatePlan(id: string, plan: Partial<Plan>): Promise<Plan>;
    findByPriceRange(minPrice: number, maxPrice: number): Promise<Plan[]>;
}
