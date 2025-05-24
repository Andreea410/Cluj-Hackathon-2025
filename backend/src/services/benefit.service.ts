import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { Benefit } from '../models/benefit.model';
import { IBenefitRepository } from '../repositories/interfaces/benefit.repository.interface';

@Injectable()
export class BenefitService extends BaseService<Benefit> {
  constructor(private readonly benefitRepository: IBenefitRepository) {
    super(benefitRepository);
  }

  async createBenefit(benefit: Benefit): Promise<Benefit> {
    const existingBenefit = await this.benefitRepository.findByName(benefit.name);
    if (existingBenefit) {
      throw new Error('A benefit with this name already exists');
    }
    return this.create(benefit);
  }

  async updateBenefit(id: string, benefit: Partial<Benefit>): Promise<Benefit> {
    if (benefit.name) {
      const existingBenefit = await this.benefitRepository.findByName(benefit.name);
      if (existingBenefit && existingBenefit.id !== id) {
        throw new Error('A benefit with this name already exists');
      }
    }
    return this.update(id, benefit);
  }
} 