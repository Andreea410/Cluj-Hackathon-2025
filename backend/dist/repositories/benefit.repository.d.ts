import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IBenefitRepository } from './interfaces/benefit.repository.interface';
import { Benefit } from '../models/benefit.model';
export declare class BenefitRepository extends BaseSupabaseRepository<Benefit> implements IBenefitRepository {
    constructor(supabase: SupabaseClient);
    findByName(name: string): Promise<Benefit | null>;
}
