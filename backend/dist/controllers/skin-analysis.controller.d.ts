import { SkinAnalysisService } from '../services/skin-analysis.service';
export declare class SkinAnalysisController {
    private readonly skinAnalysisService;
    constructor(skinAnalysisService: SkinAnalysisService);
    startAnalysis(userId: string): Promise<import("../models/skin-analysis.model").SkinAnalysis>;
    processResponse(userId: string, message: string): Promise<import("../models/agent-log.model").AgentLog>;
    getHistory(userId: string): Promise<import("../models/agent-log.model").AgentLog[]>;
}
