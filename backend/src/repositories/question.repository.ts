import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IQuestionRepository } from './interfaces/question.repository.interface';
import { Question } from '../models/question.model';
import { DatabaseError } from '../shared/exceptions/database.error';

@Injectable()
export class QuestionRepository extends BaseSupabaseRepository<Question> implements IQuestionRepository {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'questions', Question);
  }

  async findByFieldKey(fieldKey: string): Promise<Question[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('field_key', fieldKey)
      .order('id');

    if (error) throw new DatabaseError(error.message);
    return data.map(item => Question.fromJSON(item));
  }

  async findByText(text: string): Promise<Question[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .ilike('text', `%${text}%`)
      .order('id');

    if (error) throw new DatabaseError(error.message);
    return data.map(item => Question.fromJSON(item));
  }

  async searchQuestions(query: string): Promise<Question[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .or(`text.ilike.%${query}%,field_key.ilike.%${query}%`)
      .order('id');

    if (error) throw new DatabaseError(error.message);
    return data.map(item => Question.fromJSON(item));
  }
} 