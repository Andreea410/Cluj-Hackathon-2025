import { BaseModel } from './base.model';

export class Order extends BaseModel {
  user_id: string;
  total_amount: number;
  status: string;
  created_at: Date;

  constructor(partial: Partial<Order>) {
    super();
    Object.assign(this, partial);
    if (partial.created_at) {
      this.created_at = new Date(partial.created_at);
    }
  }

  toJSON() {
    return {
      ...super.toJSON(),
      user_id: this.user_id,
      total_amount: this.total_amount,
      status: this.status,
      created_at: this.created_at
    };
  }

  static fromJSON(json: any): Order {
    return new Order({
      id: json.id,
      user_id: json.user_id,
      total_amount: json.total_amount,
      status: json.status,
      created_at: json.created_at
    });
  }
} 