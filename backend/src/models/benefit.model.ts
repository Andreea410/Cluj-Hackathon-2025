import { BaseModel } from './base.model';

export class Benefit extends BaseModel {
  name: string;
  description: string;

  constructor(partial: Partial<Benefit>) {
    super();
    Object.assign(this, partial);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      name: this.name,
      description: this.description
    };
  }

  static fromJSON(json: any): Benefit {
    return new Benefit({
      id: json.id,
      name: json.name,
      description: json.description
    });
  }
}