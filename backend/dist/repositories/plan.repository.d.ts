import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IPlanRepository } from './interfaces/plan.repository.interface';
import { Plan } from '../models/plan.model';
export declare class PlanRepository extends BaseSupabaseRepository<Plan> implements IPlanRepository {
    constructor(supabase: SupabaseClient);
    findByName(name: string): Promise<Plan | null>;
    findByPriceRange(minPrice: number, maxPrice: number): Promise<Plan[]>;
}
