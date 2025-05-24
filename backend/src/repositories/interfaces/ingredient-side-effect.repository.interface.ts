import { IBaseRepository } from './base.repository.interface';
import { IngredientSideEffect } from '../../models/ingredient-side-effect.model';

export interface IIngredientSideEffectRepository extends IBaseRepository<IngredientSideEffect> {
  findByIngredientId(ingredientId: string): Promise<IngredientSideEffect[]>;
  findBySideEffectId(sideEffectId: string): Promise<IngredientSideEffect[]>;
  findByIngredientAndSideEffect(ingredientId: string, sideEffectId: string): Promise<IngredientSideEffect | null>;
  findWithRelations(id: string): Promise<IngredientSideEffect | null>;
  findAllWithRelations(): Promise<IngredientSideEffect[]>;
  findAllByIngredientWithSideEffects(ingredientId: string): Promise<IngredientSideEffect[]>;
  findAllBySideEffectWithIngredients(sideEffectId: string): Promise<IngredientSideEffect[]>;
} 