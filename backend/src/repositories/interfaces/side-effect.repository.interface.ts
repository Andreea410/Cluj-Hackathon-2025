import { IBaseRepository } from './base.repository.interface';
import { SideEffect } from '../../models/side-effect.model';

export interface ISideEffectRepository extends IBaseRepository<SideEffect> {
  findByName(name: string): Promise<SideEffect | null>;
  searchByName(query: string): Promise<SideEffect[]>;
  findByNameOrDescription(query: string): Promise<SideEffect[]>;
} 