import { BaseModel } from './base.model';

export class ProductIngredient extends BaseModel {
  product_id: string;
  ingredient_id: string;

  constructor(partial: Partial<ProductIngredient>) {
    super();
    Object.assign(this, partial);
  }

  override toJSON(): Record<string, any> {
    const base = super.toJSON();
    return {
      ...base,
      product_id: this.product_id,
      ingredient_id: this.ingredient_id
    };
  }

  static fromJSON(json: any): ProductIngredient {
    return new ProductIngredient({
      id: json.id,
      product_id: json.product_id,
      ingredient_id: json.ingredient_id
    });
  }
} 