import { BaseModel } from './base.model';
import { Order } from './order.model';

export class Payment extends BaseModel {
  order_id: string;
  stripe_charge_id: string;
  paid_at: Date;
  order?: Order; // Optional property for when order is included

  constructor(partial: Partial<Payment>) {
    super();
    Object.assign(this, partial);
    if (partial.paid_at) {
      this.paid_at = new Date(partial.paid_at);
    }
  }

  toJSON() {
    return {
      ...super.toJSON(),
      order_id: this.order_id,
      stripe_charge_id: this.stripe_charge_id,
      paid_at: this.paid_at,
      ...(this.order && { order: this.order.toJSON() })
    };
  }

  static fromJSON(json: any): Payment {
    return new Payment({
      id: json.id,
      order_id: json.order_id,
      stripe_charge_id: json.stripe_charge_id,
      paid_at: json.paid_at,
      ...(json.order && { order: Order.fromJSON(json.order) })
    });
  }
} 