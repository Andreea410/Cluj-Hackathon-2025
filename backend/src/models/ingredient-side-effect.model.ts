import { BaseModel } from './base.model';
import { Ingredient } from './ingredient.model';
import { SideEffect } from './side-effect.model';

export class IngredientSideEffect extends BaseModel {
  ingredient_id: string;
  side_effect_id: string;
  ingredient?: Ingredient; // Optional property for when ingredient is included
  sideEffect?: SideEffect; // Optional property for when side effect is included

  constructor(partial: Partial<IngredientSideEffect>) {
    super();
    Object.assign(this, partial);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      ingredient_id: this.ingredient_id,
      side_effect_id: this.side_effect_id,
      ...(this.ingredient && { ingredient: this.ingredient.toJSON() }),
      ...(this.sideEffect && { sideEffect: this.sideEffect.toJSON() })
    };
  }

  static fromJSON(json: any): IngredientSideEffect {
    return new IngredientSideEffect({
      id: json.id,
      ingredient_id: json.ingredient_id,
      side_effect_id: json.side_effect_id,
      ...(json.ingredient && { ingredient: Ingredient.fromJSON(json.ingredient) }),
      ...(json.side_effect && { sideEffect: SideEffect.fromJSON(json.side_effect) })
    });
  }
} 