import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IRoutineStepProductRepository } from './interfaces/routine-step-product.repository.interface';
import { RoutineStepProduct } from '../models/routine-step-product.model';
export declare class RoutineStepProductRepository extends BaseSupabaseRepository<RoutineStepProduct> implements IRoutineStepProductRepository {
    constructor(supabase: SupabaseClient);
    findByRoutineStepId(routineStepId: string): Promise<RoutineStepProduct[]>;
    findByProductId(productId: string): Promise<RoutineStepProduct[]>;
    findByRoutineStepAndProduct(routineStepId: string, productId: string): Promise<RoutineStepProduct | null>;
    findWithRelations(id: string): Promise<RoutineStepProduct | null>;
    findAllWithRelations(): Promise<RoutineStepProduct[]>;
    findAllByStepWithProducts(routineStepId: string): Promise<RoutineStepProduct[]>;
    findAllByProductWithSteps(productId: string): Promise<RoutineStepProduct[]>;
}
