import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IRoutineAdjustmentRepository } from './interfaces/routine-adjustment.repository.interface';
import { RoutineAdjustment } from '../models/routine-adjustment.model';
import { DatabaseError } from '../shared/exceptions/database.error';

@Injectable()
export class RoutineAdjustmentRepository extends BaseSupabaseRepository<RoutineAdjustment> implements IRoutineAdjustmentRepository {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'routine_adjustments', RoutineAdjustment);
  }

  async findByUserId(userId: string): Promise<RoutineAdjustment[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => RoutineAdjustment.fromJSON(item));
  }

  async findByPhotoAnalysisId(photoAnalysisId: string): Promise<RoutineAdjustment[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('photo_analysis_id', photoAnalysisId);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => RoutineAdjustment.fromJSON(item));
  }

  async findByAuthUserId(authUserId: string): Promise<RoutineAdjustment[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('auth_user_id', authUserId);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => RoutineAdjustment.fromJSON(item));
  }

  async findWithRelations(id: string): Promise<RoutineAdjustment | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        user:user_id (*),
        photo_analysis:photo_analysis_id (*)
      `)
      .eq('id', id)
      .single();

    if (error) throw new DatabaseError(error.message);
    return data ? RoutineAdjustment.fromJSON(data) : null;
  }

  async findAllWithRelations(): Promise<RoutineAdjustment[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        user:user_id (*),
        photo_analysis:photo_analysis_id (*)
      `);

    if (error) throw new DatabaseError(error.message);
    return data.map(item => RoutineAdjustment.fromJSON(item));
  }
} 