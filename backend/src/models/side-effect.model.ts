import { BaseModel } from './base.model';

export class SideEffect extends BaseModel {
  name: string;
  description: string;

  constructor(partial: Partial<SideEffect>) {
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

  static fromJSON(json: any): SideEffect {
    return new SideEffect({
      id: json.id,
      name: json.name,
      description: json.description
    });
  }
} 