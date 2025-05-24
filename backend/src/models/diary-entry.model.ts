import { BaseModel } from './base.model';

export class DiaryEntry extends BaseModel {
  user_id: string;
  date: Date;
  image_url: string;
  notes: string;
  created_at: Date;

  constructor(partial: Partial<DiaryEntry>) {
    super();
    Object.assign(this, partial);
  }

  override toJSON(): Record<string, any> {
    const base = super.toJSON();
    return {
      ...base,
      user_id: this.user_id,
      date: this.date,
      image_url: this.image_url,
      notes: this.notes,
      created_at: this.created_at
    };
  }

  static fromJSON(json: any): DiaryEntry {
    return new DiaryEntry({
      id: json.id,
      user_id: json.user_id,
      date: new Date(json.date),
      image_url: json.image_url,
      notes: json.notes,
      created_at: new Date(json.created_at)
    });
  }
} 