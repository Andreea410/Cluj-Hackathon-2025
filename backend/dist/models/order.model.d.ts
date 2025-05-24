import { BaseModel } from './base.model';
export declare class Order extends BaseModel {
    user_id: string;
    total_amount: number;
    status: string;
    created_at: Date;
    constructor(partial: Partial<Order>);
    toJSON(): {
        user_id: string;
        total_amount: number;
        status: string;
        created_at: Date;
    };
    static fromJSON(json: any): Order;
}
