import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { ISideEffectRepository } from './interfaces/side-effect.repository.interface';
import { SideEffect } from '../models/side-effect.model';
export declare class SideEffectRepository extends BaseSupabaseRepository<SideEffect> implements ISideEffectRepository {
    constructor(supabase: SupabaseClient);
    findByName(name: string): Promise<SideEffect | null>;
    searchByName(query: string): Promise<SideEffect[]>;
    findByNameOrDescription(query: string): Promise<SideEffect[]>;
}
