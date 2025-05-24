import { BaseService } from './base.service';
import { SideEffect } from '../models/side-effect.model';
import { ISideEffectRepository } from '../repositories/interfaces/side-effect.repository.interface';
export declare class SideEffectService extends BaseService<SideEffect> {
    private readonly sideEffectRepository;
    constructor(sideEffectRepository: ISideEffectRepository);
    createSideEffect(sideEffect: SideEffect): Promise<SideEffect>;
    updateSideEffect(id: string, sideEffect: Partial<SideEffect>): Promise<SideEffect>;
    searchSideEffects(query: string): Promise<SideEffect[]>;
    findByName(name: string): Promise<SideEffect | null>;
    searchByName(query: string): Promise<SideEffect[]>;
}
