import { BaseModel } from './base.model';

export class Option extends BaseModel {
  text: string;
  question_id: string;
  created_at: Date;

  constructor(partial: Partial<Option>) {
    super();
    Object.assign(this, partial);
    if (partial.created_at) {
      this.created_at = new Date(partial.created_at);
    }
  }

  toJSON() {
    return {
      ...super.toJSON(),
      text: this.text,
      question_id: this.question_id,
      created_at: this.created_at
    };
  }

  static fromJSON(json: any): Option {
    return new Option({
      id: json.id,
      text: json.text,
      question_id: json.question_id,
      created_at: json.created_at
    });
  }
} 