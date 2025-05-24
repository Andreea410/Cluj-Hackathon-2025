import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base.supabase.repository';
import { IAgentLogRepository } from './interfaces/agent-log.repository.interface';
import { AgentLog } from '../models/agent-log.model';
export declare class AgentLogRepository extends BaseSupabaseRepository<AgentLog> implements IAgentLogRepository {
    constructor(supabase: SupabaseClient);
    findByUserId(userId: string): Promise<AgentLog[]>;
    findByRole(role: string): Promise<AgentLog[]>;
    findByUserAndRole(userId: string, role: string): Promise<AgentLog[]>;
    findWithUser(id: string): Promise<AgentLog | null>;
    findAllWithUsers(): Promise<AgentLog[]>;
    findLatestByUser(userId: string, limit: number): Promise<AgentLog[]>;
}
