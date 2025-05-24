import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { RoutineTemplate } from '../models/routine-template.model';
import { IRoutineTemplateRepository } from '../repositories/interfaces/routine-template.repository.interface';

@Injectable()
export class RoutineTemplateService extends BaseService<RoutineTemplate> {
  constructor(private readonly routineTemplateRepository: IRoutineTemplateRepository) {
    super(routineTemplateRepository);
  }

  async createTemplate(template: RoutineTemplate): Promise<RoutineTemplate> {
    if (!template.name) {
      throw new Error('Template name is required');
    }

    if (!template.description) {
      throw new Error('Template description is required');
    }

    const existing = await this.routineTemplateRepository.findByNameExact(template.name);
    if (existing) {
      throw new Error('A template with this name already exists');
    }

    return this.create(template);
  }

  async updateTemplate(id: string, template: Partial<RoutineTemplate>): Promise<RoutineTemplate> {
    if (template.name === '') {
      throw new Error('Template name cannot be empty');
    }

    if (template.description === '') {
      throw new Error('Template description cannot be empty');
    }

    const existing = await this.findById(id);
    if (!existing) {
      throw new Error('Template not found');
    }

    if (template.name) {
      const duplicate = await this.routineTemplateRepository.findByNameExact(template.name);
      if (duplicate && duplicate.id !== id) {
        throw new Error('A template with this name already exists');
      }
    }

    return this.update(id, template);
  }

  async searchTemplates(query?: string): Promise<RoutineTemplate[]> {
    if (!query) {
      return this.findAll();
    }
    return this.routineTemplateRepository.searchTemplates(query);
  }

  async findByName(name: string): Promise<RoutineTemplate[]> {
    return this.routineTemplateRepository.findByName(name);
  }
} 