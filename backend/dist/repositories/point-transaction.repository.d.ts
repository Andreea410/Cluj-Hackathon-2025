import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IPointTransactionRepository } from './interfaces/point-transaction.repository.interface';
import { PointTransaction } from '../models/point-transaction.model';
export declare class PointTransactionRepository extends BaseSupabaseRepository<PointTransaction> implements IPointTransactionRepository {
    constructor(supabase: SupabaseClient);
    findByUserId(userId: string): Promise<PointTransaction[]>;
    findByAuthUserId(authUserId: string): Promise<PointTransaction[]>;
    findWithUser(id: string): Promise<PointTransaction | null>;
    findAllWithUser(): Promise<PointTransaction[]>;
    findAllByUserWithDetails(userId: string): Promise<PointTransaction[]>;
    getTotalPointsByUser(userId: string): Promise<number>;
}
