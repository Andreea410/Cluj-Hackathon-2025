import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IUserResponseRepository } from './interfaces/user-response.repository.interface';
import { UserResponse } from '../models/user-response.model';
import { DatabaseError } from '../shared/exceptions/database.error';

@Injectable()
export class UserResponseRepository extends BaseSupabaseRepository<UserResponse> implements IUserResponseRepository {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'user_responses', UserResponse);
  }

  async findByUserId(userId: string): Promise<UserResponse[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => UserResponse.fromJSON(item));
  }

  async findByQuestionId(questionId: string): Promise<UserResponse[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('question_id', questionId)
      .order('created_at', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => UserResponse.fromJSON(item));
  }

  async findByOptionId(optionId: string): Promise<UserResponse[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('option_id', optionId)
      .order('created_at', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => UserResponse.fromJSON(item));
  }

  async findByAuthUserId(authUserId: string): Promise<UserResponse[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('auth_user_id', authUserId)
      .order('created_at', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => UserResponse.fromJSON(item));
  }

  async findByUserAndQuestion(userId: string, questionId: string): Promise<UserResponse | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .eq('question_id', questionId)
      .single();

    if (error) throw new DatabaseError(error.message);
    return data ? UserResponse.fromJSON(data) : null;
  }

  async findWithRelations(id: string): Promise<UserResponse | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        user:user_id (*),
        question:question_id (*),
        option:option_id (*)
      `)
      .eq('id', id)
      .single();

    if (error) throw new DatabaseError(error.message);
    return data ? UserResponse.fromJSON(data) : null;
  }

  async findAllWithRelations(): Promise<UserResponse[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        user:user_id (*),
        question:question_id (*),
        option:option_id (*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => UserResponse.fromJSON(item));
  }

  async findAllByUserWithDetails(userId: string): Promise<UserResponse[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        question:question_id (*),
        option:option_id (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => UserResponse.fromJSON(item));
  }

  async findAllByQuestionWithDetails(questionId: string): Promise<UserResponse[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        user:user_id (*),
        option:option_id (*)
      `)
      .eq('question_id', questionId)
      .order('created_at', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => UserResponse.fromJSON(item));
  }

  async findAllByOptionWithDetails(optionId: string): Promise<UserResponse[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        user:user_id (*),
        question:question_id (*)
      `)
      .eq('option_id', optionId)
      .order('created_at', { ascending: false });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => UserResponse.fromJSON(item));
  }

  async countResponsesByOption(questionId: string): Promise<Record<string, number>> {
    const { data, error } = await this.supabase
      .rpc('count_responses_by_option', { question_id: questionId });

    if (error) throw new DatabaseError(error.message);
    
    return data.reduce((acc, curr) => ({
      ...acc,
      [curr.option_id]: parseInt(curr.count)
    }), {});
  }
} 