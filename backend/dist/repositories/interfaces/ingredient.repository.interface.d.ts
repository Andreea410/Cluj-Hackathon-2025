import { IBaseRepository } from './base.repository.interface';
import { Ingredient } from '../../models/ingredient.model';
export interface IIngredientRepository extends IBaseRepository<Ingredient> {
    findByName(name: string): Promise<Ingredient | null>;
}
