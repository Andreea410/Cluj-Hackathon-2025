import { BaseService } from './base.service';
import { IngredientSideEffect } from '../models/ingredient-side-effect.model';
import { IIngredientSideEffectRepository } from '../repositories/interfaces/ingredient-side-effect.repository.interface';
export declare class IngredientSideEffectService extends BaseService<IngredientSideEffect> {
    private readonly ingredientSideEffectRepository;
    constructor(ingredientSideEffectRepository: IIngredientSideEffectRepository);
    createIngredientSideEffect(ingredientSideEffect: IngredientSideEffect): Promise<IngredientSideEffect>;
    findByIngredientId(ingredientId: string): Promise<IngredientSideEffect[]>;
    findBySideEffectId(sideEffectId: string): Promise<IngredientSideEffect[]>;
    findByIngredientAndSideEffect(ingredientId: string, sideEffectId: string): Promise<IngredientSideEffect | null>;
    findWithRelations(id: string): Promise<IngredientSideEffect | null>;
    findAllWithRelations(): Promise<IngredientSideEffect[]>;
    findAllByIngredientWithSideEffects(ingredientId: string): Promise<IngredientSideEffect[]>;
    findAllBySideEffectWithIngredients(sideEffectId: string): Promise<IngredientSideEffect[]>;
    updateIngredientSideEffect(id: string, ingredientSideEffect: Partial<IngredientSideEffect>): Promise<IngredientSideEffect>;
    bulkCreateIngredientSideEffects(ingredientId: string, sideEffectIds: string[]): Promise<IngredientSideEffect[]>;
}
