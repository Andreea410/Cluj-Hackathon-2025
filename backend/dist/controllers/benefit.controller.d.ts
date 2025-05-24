import { BenefitService } from '../services/benefit.service';
import { Benefit } from '../models/benefit.model';
export declare class BenefitController {
    private readonly benefitService;
    constructor(benefitService: BenefitService);
    createBenefit(benefit: Benefit): Promise<Benefit>;
    getBenefit(id: string): Promise<Benefit>;
    getAllBenefits(): Promise<Benefit[]>;
    updateBenefit(id: string, benefit: Partial<Benefit>): Promise<Benefit>;
    deleteBenefit(id: string): Promise<void>;
}
