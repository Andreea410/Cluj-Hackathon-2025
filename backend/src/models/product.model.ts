import { BaseModel } from './base.model';

export class Product extends BaseModel {
  name: string;
  brand_id: string;
  price: number;
  photo_url: string;
  description: string;
  stock: number;

  constructor(partial: Partial<Product>) {
    super();
    Object.assign(this, partial);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      name: this.name,
      brand_id: this.brand_id,
      price: this.price,
      photo_url: this.photo_url,
      description: this.description,
      stock: this.stock
    };
  }

  static fromJSON(json: any): Product {
    return new Product({
      id: json.id,
      name: json.name,
      brand_id: json.brand_id,
      price: json.price,
      photo_url: json.photo_url,
      description: json.description,
      stock: json.stock
    });
  }
} 