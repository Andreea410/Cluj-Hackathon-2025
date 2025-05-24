import { BaseService } from './base.service';
import { AgentLog } from '../models/agent-log.model';
import { AgentLogRepository } from '../repositories/agent-log.repository';
export declare class AgentLogService extends BaseService<AgentLog> {
    private readonly agentLogRepository;
    constructor(agentLogRepository: AgentLogRepository);
    createAgentLog(agentLog: AgentLog): Promise<AgentLog>;
    updateAgentLog(id: string, agentLog: Partial<AgentLog>): Promise<AgentLog>;
    findWithUser(id: string): Promise<AgentLog | null>;
    findByUserAndRole(userId: string, role: string): Promise<AgentLog[]>;
    findLatestByUser(userId: string, limit: number): Promise<AgentLog[]>;
    findByUserId(userId: string): Promise<AgentLog[]>;
    findByRole(role: string): Promise<AgentLog[]>;
    findAllWithUsers(): Promise<AgentLog[]>;
}
