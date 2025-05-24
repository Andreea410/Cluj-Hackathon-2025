import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { Plan } from '../models/plan.model';
import { IPlanRepository } from '../repositories/interfaces/plan.repository.interface';

@Injectable()
export class PlanService extends BaseService<Plan> {
  constructor(private readonly planRepository: IPlanRepository) {
    super(planRepository);
  }

  async createPlan(plan: Plan): Promise<Plan> {
    const existingPlan = await this.planRepository.findByName(plan.name);
    if (existingPlan) {
      throw new Error('A plan with this name already exists');
    }

    return this.create(plan);
  }

  async updatePlan(id: string, plan: Partial<Plan>): Promise<Plan> {
    if (plan.name) {
      const existingPlan = await this.planRepository.findByName(plan.name);
      if (existingPlan && existingPlan.id !== id) {
        throw new Error('A plan with this name already exists');
      }
    }

    return this.update(id, plan);
  }

  async findByPriceRange(minPrice: number, maxPrice: number): Promise<Plan[]> {
    return this.planRepository.findByPriceRange(minPrice, maxPrice);
  }
} 