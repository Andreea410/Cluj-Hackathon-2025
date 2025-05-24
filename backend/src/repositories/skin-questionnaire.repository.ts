import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { SkinQuestionnaire } from '../models/skin-questionnaire.model';

@Injectable()
export class SkinQuestionnaireRepository extends BaseSupabaseRepository<SkinQuestionnaire> {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'user_responses', SkinQuestionnaire);
  }

  async findByUserId(userId: string): Promise<SkinQuestionnaire[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    return data.map(item => SkinQuestionnaire.fromJSON(item));
  }
} 