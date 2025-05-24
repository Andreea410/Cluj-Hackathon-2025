import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { SkinQuestionnaire } from '../models/skin-questionnaire.model';
export declare class SkinQuestionnaireRepository extends BaseSupabaseRepository<SkinQuestionnaire> {
    constructor(supabase: SupabaseClient);
    findByUserId(userId: string): Promise<SkinQuestionnaire[]>;
}
