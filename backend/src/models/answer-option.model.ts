import { BaseModel } from './base.model';

export class AnswerOption extends BaseModel {
  question_id: string;
  value: string;

  constructor(partial: Partial<AnswerOption>) {
    super();
    Object.assign(this, partial);
  }

  override toJSON(): Record<string, any> {
    const base = super.toJSON();
    return {
      ...base,
      question_id: this.question_id,
      value: this.value
    };
  }

  static fromJSON(json: any): AnswerOption {
    return new AnswerOption({
      id: json.id,
      question_id: json.question_id,
      value: json.value
    });
  }
} 