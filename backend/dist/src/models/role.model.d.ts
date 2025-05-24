import { BaseModel } from './base.model';
export declare class Role extends BaseModel {
    name: string;
    permissions: string[];
    constructor(partial: Partial<Role>);
    toJSON(): {
        name: string;
        permissions: string[];
    };
    static fromJSON(json: any): Role;
}
