import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IAnswerOptionRepository } from './interfaces/answer-option.repository.interface';
import { AnswerOption } from '../models/answer-option.model';
import { Question } from '../models/question.model';
import { DatabaseError } from '../shared/exceptions/database.error';

@Injectable()
export class AnswerOptionRepository extends BaseSupabaseRepository<AnswerOption> implements IAnswerOptionRepository {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'answer_options', AnswerOption);
  }

  async findByQuestionId(questionId: string): Promise<AnswerOption[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('question_id', questionId)
      .order('id');

    if (error) throw new DatabaseError(error.message);
    return data.map(item => AnswerOption.fromJSON(item));
  }

  async findByValue(value: string): Promise<AnswerOption[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .ilike('value', `%${value}%`)
      .order('id');

    if (error) throw new DatabaseError(error.message);
    return data.map(item => AnswerOption.fromJSON(item));
  }

  async findQuestionWithOptions(questionId: string): Promise<{ question: Question; options: AnswerOption[] }> {
    const { data, error } = await this.supabase
      .from('questions')
      .select(`
        *,
        answer_options (*)
      `)
      .eq('id', questionId)
      .single();

    if (error) throw new DatabaseError(error.message);
    if (!data) throw new DatabaseError('Question not found');

    return {
      question: Question.fromJSON(data),
      options: data.answer_options.map(option => AnswerOption.fromJSON(option))
    };
  }

  async findByQuestionIdAndValue(questionId: string, value: string): Promise<AnswerOption | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('question_id', questionId)
      .eq('value', value)
      .single();

    if (error) throw new DatabaseError(error.message);
    return data ? AnswerOption.fromJSON(data) : null;
  }
} 