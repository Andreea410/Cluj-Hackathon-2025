import { BaseModel } from './base.model';

export class Question extends BaseModel {
  text: string;
  field_key: string;

  constructor(partial: Partial<Question>) {
    super();
    Object.assign(this, partial);
  }

  override toJSON(): Record<string, any> {
    const base = super.toJSON();
    return {
      ...base,
      text: this.text,
      field_key: this.field_key
    };
  }

  static fromJSON(json: any): Question {
    return new Question({
      id: json.id,
      text: json.text,
      field_key: json.field_key
    });
  }
} 