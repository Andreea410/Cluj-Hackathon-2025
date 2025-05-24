import { IBaseRepository } from './base.repository.interface';
import { Plan } from '../../models/plan.model';
export interface IPlanRepository extends IBaseRepository<Plan> {
    findByName(name: string): Promise<Plan | null>;
    findByPriceRange(minPrice: number, maxPrice: number): Promise<Plan[]>;
}
