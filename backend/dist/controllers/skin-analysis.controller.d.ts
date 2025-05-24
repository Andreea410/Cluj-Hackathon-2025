import { SkinAnalysisService } from '../services/skin-analysis.service';
export declare class SkinAnalysisController {
    private readonly skinAnalysisService;
    constructor(skinAnalysisService: SkinAnalysisService);
    startAnalysis(userId: string): Promise<any>;
    processResponse(userId: string, message: string): Promise<any>;
    getHistory(userId: string): Promise<any>;
}
