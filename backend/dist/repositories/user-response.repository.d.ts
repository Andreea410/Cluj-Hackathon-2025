import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IUserResponseRepository } from './interfaces/user-response.repository.interface';
import { UserResponse } from '../models/user-response.model';
export declare class UserResponseRepository extends BaseSupabaseRepository<UserResponse> implements IUserResponseRepository {
    constructor(supabase: SupabaseClient);
    findByUserId(userId: string): Promise<UserResponse[]>;
    findByQuestionId(questionId: string): Promise<UserResponse[]>;
    findByOptionId(optionId: string): Promise<UserResponse[]>;
    findByAuthUserId(authUserId: string): Promise<UserResponse[]>;
    findByUserAndQuestion(userId: string, questionId: string): Promise<UserResponse | null>;
    findWithRelations(id: string): Promise<UserResponse | null>;
    findAllWithRelations(): Promise<UserResponse[]>;
    findAllByUserWithDetails(userId: string): Promise<UserResponse[]>;
    findAllByQuestionWithDetails(questionId: string): Promise<UserResponse[]>;
    findAllByOptionWithDetails(optionId: string): Promise<UserResponse[]>;
    countResponsesByOption(questionId: string): Promise<Record<string, number>>;
}
