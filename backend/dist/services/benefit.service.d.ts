import { BaseService } from './base.service';
import { Benefit } from '../models/benefit.model';
import { IBenefitRepository } from '../repositories/interfaces/benefit.repository.interface';
export declare class BenefitService extends BaseService<Benefit> {
    private readonly benefitRepository;
    constructor(benefitRepository: IBenefitRepository);
    createBenefit(benefit: Benefit): Promise<Benefit>;
    updateBenefit(id: string, benefit: Partial<Benefit>): Promise<Benefit>;
}
