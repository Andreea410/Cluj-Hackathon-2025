import { BaseModel } from './base.model';

export class Reward extends BaseModel {
  name: string;
  description: string;
  threshold_points: number;

  constructor(partial: Partial<Reward>) {
    super();
    Object.assign(this, partial);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      name: this.name,
      description: this.description,
      threshold_points: this.threshold_points
    };
  }

  static fromJSON(json: any): Reward {
    return new Reward({
      id: json.id,
      name: json.name,
      description: json.description,
      threshold_points: json.threshold_points
    });
  }
} 