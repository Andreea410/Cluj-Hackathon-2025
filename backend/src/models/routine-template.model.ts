import { BaseModel } from './base.model';

export class RoutineTemplate extends BaseModel {
  name: string;
  description: string;

  constructor(partial: Partial<RoutineTemplate>) {
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

  static fromJSON(json: any): RoutineTemplate {
    return new RoutineTemplate({
      id: json.id,
      name: json.name,
      description: json.description
    });
  }
} 