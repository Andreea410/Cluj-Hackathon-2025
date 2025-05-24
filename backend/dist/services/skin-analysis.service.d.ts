import { BaseService } from './base.service';
import { SkinAnalysis } from '../models/skin-analysis.model';
import { SkinAnalysisRepository } from '../repositories/skin-analysis.repository';
import { AgentLogService } from './agent-log.service';
import { AgentLog } from '../models/agent-log.model';
export declare class SkinAnalysisService extends BaseService<SkinAnalysis> {
    private readonly skinAnalysisRepository;
    private readonly agentLogService;
    private readonly logger;
    constructor(skinAnalysisRepository: SkinAnalysisRepository, agentLogService: AgentLogService);
    findByUserId(userId: string): Promise<SkinAnalysis | null>;
    startAnalysis(userId: string): Promise<SkinAnalysis>;
    processUserResponse(userId: string, response: string): Promise<SkinAnalysis>;
    private updateSkinInfo;
    private generateNextMessage;
    processResponse(userId: string, message: string): Promise<AgentLog>;
    getHistory(userId: string): Promise<AgentLog[]>;
}
