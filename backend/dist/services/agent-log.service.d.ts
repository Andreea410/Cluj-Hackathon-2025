import { BaseService } from './base.service';
import { AgentLog } from '../models/agent-log.model';
import { IAgentLogRepository } from '../repositories/interfaces/agent-log.repository.interface';
export declare class AgentLogService extends BaseService<AgentLog> {
    private readonly agentLogRepository;
    constructor(agentLogRepository: IAgentLogRepository);
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
}
