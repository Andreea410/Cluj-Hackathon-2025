import { AIAgentService } from '../services/ai-agent.service';
import { SkinProfile } from '../models/skin-profile.model';
import { PhotoAnalysis } from '../models/photo-analysis.model';
export declare class AIAgentController {
    private readonly aiAgentService;
    constructor(aiAgentService: AIAgentService);
    analyzeSkinProfile(profile: SkinProfile): Promise<SkincareRoutine>;
    analyzeProgress(analyses: PhotoAnalysis[]): Promise<{
        improvements: string[];
        recommendations: string[];
    }>;
}
