import { BaseModel } from './base.model';

export class Benefit extends BaseModel {
  name: string;
  description: string;

  constructor(partial: Partial<Benefit>) {
    super();
    Object.assign(this, partial);
  }

  override toJSON(): Record<string, any> {
    const base = super.toJSON();
    return {
      ...base,
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