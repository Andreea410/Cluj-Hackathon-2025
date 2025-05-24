import { BaseModel } from './base.model';
import { Order } from './order.model';
export declare class Payment extends BaseModel {
    order_id: string;
    stripe_charge_id: string;
    paid_at: Date;
    order?: Order;
    constructor(partial: Partial<Payment>);
    toJSON(): {
        order: any;
        order_id: string;
        stripe_charge_id: string;
        paid_at: Date;
    };
    static fromJSON(json: any): Payment;
}
