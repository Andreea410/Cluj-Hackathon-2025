import { SkinProfile } from '../models/skin-profile.model';
import { SkincareRoutine } from '../models/skincare-routine.model';
import { PhotoAnalysis } from '../models/photo-analysis.model';
import { AgentLogService } from './agent-log.service';
export declare class AIAgentService {
    private readonly agentLogService;
    constructor(agentLogService: AgentLogService);
    analyzeSkinProfile(profile: SkinProfile): Promise<SkincareRoutine>;
    analyzeProgress(photoAnalyses: PhotoAnalysis[]): Promise<{
        improvements: string[];
        recommendations: string[];
    }>;
    private generateRoutine;
    private compareMetrics;
    private generateRecommendations;
}
