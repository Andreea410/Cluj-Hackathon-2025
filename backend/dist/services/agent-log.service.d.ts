import { BaseService } from './base.service';
import { AgentLog } from '../models/agent-log.model';
import { BaseSupabaseRepository } from '../repositories/base.supabase.repository';
export declare class AgentLogService extends BaseService<AgentLog> {
    private readonly agentLogRepository;
    constructor(agentLogRepository: BaseSupabaseRepository<AgentLog>);
    createAgentLog(agentLog: AgentLog): Promise<AgentLog>;
    findByUserId(userId: string): Promise<AgentLog[]>;
    findByRole(role: string): Promise<AgentLog[]>;
    findByUserAndRole(userId: string, role: string): Promise<AgentLog[]>;
    findWithUser(id: string): Promise<AgentLog | null>;
    findAllWithUsers(): Promise<AgentLog[]>;
    findLatestByUser(userId: string, limit?: number): Promise<AgentLog[]>;
    updateAgentLog(id: string, agentLog: Partial<AgentLog>): Promise<AgentLog>;
    private validateMessage;
    private validateRole;
    create(log: AgentLog): Promise<AgentLog>;
}
