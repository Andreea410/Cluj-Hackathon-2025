import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IRoutineStepRepository } from './interfaces/routine-step.repository.interface';
import { RoutineStep } from '../models/routine-step.model';
import { DatabaseError } from '../shared/exceptions/database.error';

@Injectable()
export class RoutineStepRepository extends BaseSupabaseRepository<RoutineStep> implements IRoutineStepRepository {
  constructor(supabase: SupabaseClient) {
    super(supabase, 'routine_steps', RoutineStep);
  }

  async findByRoutineTemplateId(routineTemplateId: string): Promise<RoutineStep[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('routine_template_id', routineTemplateId)
      .order('step_number', { ascending: true });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => RoutineStep.fromJSON(item));
  }

  async findByStepNumber(routineTemplateId: string, stepNumber: number): Promise<RoutineStep | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('routine_template_id', routineTemplateId)
      .eq('step_number', stepNumber)
      .single();

    if (error) throw new DatabaseError(error.message);
    return data ? RoutineStep.fromJSON(data) : null;
  }

  async findWithTemplate(id: string): Promise<RoutineStep | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        routine_template:routine_template_id (*)
      `)
      .eq('id', id)
      .single();

    if (error) throw new DatabaseError(error.message);
    return data ? RoutineStep.fromJSON(data) : null;
  }

  async findAllWithTemplate(): Promise<RoutineStep[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        routine_template:routine_template_id (*)
      `)
      .order('step_number', { ascending: true });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => RoutineStep.fromJSON(item));
  }

  async findAllByTemplateWithDetails(routineTemplateId: string): Promise<RoutineStep[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`
        *,
        routine_template:routine_template_id (*)
      `)
      .eq('routine_template_id', routineTemplateId)
      .order('step_number', { ascending: true });

    if (error) throw new DatabaseError(error.message);
    return data.map(item => RoutineStep.fromJSON(item));
  }

  async getMaxStepNumber(routineTemplateId: string): Promise<number> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('step_number')
      .eq('routine_template_id', routineTemplateId)
      .order('step_number', { ascending: false })
      .limit(1)
      .single();

    if (error) throw new DatabaseError(error.message);
    return data ? data.step_number : 0;
  }

  async reorderSteps(routineTemplateId: string, stepNumber: number): Promise<void> {
    const { error } = await this.supabase.rpc('reorder_routine_steps', {
      p_routine_template_id: routineTemplateId,
      p_from_step_number: stepNumber
    });

    if (error) throw new DatabaseError(error.message);
  }
} 