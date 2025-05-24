import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { SideEffect } from '../models/side-effect.model';
import { ISideEffectRepository } from '../repositories/interfaces/side-effect.repository.interface';

@Injectable()
export class SideEffectService extends BaseService<SideEffect> {
  constructor(private readonly sideEffectRepository: ISideEffectRepository) {
    super(sideEffectRepository);
  }

  async createSideEffect(sideEffect: SideEffect): Promise<SideEffect> {
    if (!sideEffect.name) {
      throw new Error('Side effect name is required');
    }

    const existingSideEffect = await this.sideEffectRepository.findByName(sideEffect.name);
    if (existingSideEffect) {
      throw new Error('A side effect with this name already exists');
    }

    return this.create(sideEffect);
  }

  async updateSideEffect(id: string, sideEffect: Partial<SideEffect>): Promise<SideEffect> {
    if (sideEffect.name) {
      const existingSideEffect = await this.sideEffectRepository.findByName(sideEffect.name);
      if (existingSideEffect && existingSideEffect.id !== id) {
        throw new Error('A side effect with this name already exists');
      }
    }

    return this.update(id, sideEffect);
  }

  async searchSideEffects(query: string): Promise<SideEffect[]> {
    if (!query) {
      return this.findAll();
    }
    return this.sideEffectRepository.findByNameOrDescription(query);
  }

  async findByName(name: string): Promise<SideEffect | null> {
    return this.sideEffectRepository.findByName(name);
  }

  async searchByName(query: string): Promise<SideEffect[]> {
    return this.sideEffectRepository.searchByName(query);
  }
} 