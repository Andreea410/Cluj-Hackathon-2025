import { BaseModel } from './base.model';
import { PhotoUpload } from './photo-upload.model';
export declare class PhotoAnalysis extends BaseModel {
    photo_upload_id: string;
    analyzed_at: Date;
    metrics: Record<string, any>;
    photoUpload?: PhotoUpload;
    constructor(partial: Partial<PhotoAnalysis>);
    toJSON(): {
        photoUpload: any;
        photo_upload_id: string;
        analyzed_at: Date;
        metrics: Record<string, any>;
    };
    static fromJSON(json: any): PhotoAnalysis;
}
