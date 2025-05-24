import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IRoutineTemplateRepository } from './interfaces/routine-template.repository.interface';
import { RoutineTemplate } from '../models/routine-template.model';
export declare class RoutineTemplateRepository extends BaseSupabaseRepository<RoutineTemplate> implements IRoutineTemplateRepository {
    constructor(supabase: SupabaseClient);
    findByName(name: string): Promise<RoutineTemplate[]>;
    findByNameExact(name: string): Promise<RoutineTemplate | null>;
    searchTemplates(query: string): Promise<RoutineTemplate[]>;
}
