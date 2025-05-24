import { BaseModel } from './base.model';

export class Plan extends BaseModel {
  name: string;
  price_per_month: number;
  features: any[];

  constructor(partial: Partial<Plan>) {
    super();
    Object.assign(this, partial);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      name: this.name,
      price_per_month: this.price_per_month,
      features: this.features
    };
  }

  static fromJSON(json: any): Plan {
    return new Plan({
      id: json.id,
      name: json.name,
      price_per_month: json.price_per_month,
      features: json.features
    });
  }
} 