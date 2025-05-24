import { BaseModel } from './base.model';
export declare class DiaryEntry extends BaseModel {
    user_id: string;
    date: Date;
    image_url: string;
    notes: string;
    created_at: Date;
    constructor(partial: Partial<DiaryEntry>);
    toJSON(): Record<string, any>;
    static fromJSON(json: any): DiaryEntry;
}
