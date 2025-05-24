import { BaseModel } from './base.model';

export class IngredientBenefit extends BaseModel {
  ingredient_id: string;
  benefit_id: string;

  constructor(partial: Partial<IngredientBenefit>) {
    super();
    Object.assign(this, partial);
  }

  override toJSON(): Record<string, any> {
    const base = super.toJSON();
    return {
      ...base,
      ingredient_id: this.ingredient_id,
      benefit_id: this.benefit_id
    };
  }

  static fromJSON(json: any): IngredientBenefit {
    return new IngredientBenefit({
      id: json.id,
      ingredient_id: json.ingredient_id,
      benefit_id: json.benefit_id
    });
  }
} 