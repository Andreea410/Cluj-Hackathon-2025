import { SideEffectService } from '../services/side-effect.service';
import { SideEffect } from '../models/side-effect.model';
export declare class SideEffectController {
    private readonly sideEffectService;
    constructor(sideEffectService: SideEffectService);
    createSideEffect(sideEffect: SideEffect): Promise<SideEffect>;
    getSideEffects(search?: string): Promise<SideEffect[]>;
    searchByName(query: string): Promise<SideEffect[]>;
    getSideEffect(id: string): Promise<SideEffect>;
    updateSideEffect(id: string, sideEffect: Partial<SideEffect>): Promise<SideEffect>;
    deleteSideEffect(id: string): Promise<void>;
}
