import { BaseModel } from './base.model';

export class Ingredient extends BaseModel {
  name: string;

  constructor(partial: Partial<Ingredient>) {
    super();
    Object.assign(this, partial);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      name: this.name
    };
  }

  static fromJSON(json: any): Ingredient {
    return new Ingredient({
      id: json.id,
      name: json.name
    });
  }
} 