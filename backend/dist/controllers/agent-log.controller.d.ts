import { AgentLog } from '../models/agent-log.model';
import { AgentLogService } from '../services/agent-log.service';
export declare class AgentLogController {
    private readonly agentLogService;
    constructor(agentLogService: AgentLogService);
    createAgentLog(agentLog: AgentLog): Promise<AgentLog>;
    getAgentLog(id: string, includeUser?: boolean): Promise<AgentLog>;
    getAllAgentLogs(userId?: string, role?: string, limit?: string, includeUsers?: boolean): Promise<AgentLog[]>;
    updateAgentLog(id: string, agentLog: Partial<AgentLog>): Promise<AgentLog>;
    deleteAgentLog(id: string): Promise<void>;
}
