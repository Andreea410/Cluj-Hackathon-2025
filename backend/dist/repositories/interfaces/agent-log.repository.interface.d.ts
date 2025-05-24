import { IBaseRepository } from './base.repository.interface';
import { AgentLog } from '../../models/agent-log.model';
export interface IAgentLogRepository extends IBaseRepository<AgentLog> {
    findByUserId(userId: string): Promise<AgentLog[]>;
    findByRole(role: string): Promise<AgentLog[]>;
    findByUserAndRole(userId: string, role: string): Promise<AgentLog[]>;
    findWithUser(id: string): Promise<AgentLog | null>;
    findAllWithUsers(): Promise<AgentLog[]>;
    findLatestByUser(userId: string, limit: number): Promise<AgentLog[]>;
}
