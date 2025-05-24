import { BaseModel } from './base.model';

export interface QuestionnaireResponse {
  question_id: string;
  option_id?: string;
  value?: string;
}

export class SkinQuestionnaire extends BaseModel {
  user_id: string;
  responses: QuestionnaireResponse[];
  created_at: Date;

  constructor(partial: Partial<SkinQuestionnaire>) {
    super();
    Object.assign(this, partial);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      user_id: this.user_id,
      responses: this.responses,
      created_at: this.created_at
    };
  }

  static fromJSON(json: any): SkinQuestionnaire {
    return new SkinQuestionnaire({
      id: json.id,
      user_id: json.user_id,
      responses: json.responses,
      created_at: new Date(json.created_at)
    });
  }
} 