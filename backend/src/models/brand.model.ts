import { BaseModel } from './base.model';

export class Brand extends BaseModel {
  name: string;
  website: string;
  logo_url: string;

  constructor(partial: Partial<Brand>) {
    super();
    Object.assign(this, partial);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      name: this.name,
      website: this.website,
      logo_url: this.logo_url
    };
  }

  static fromJSON(json: any): Brand {
    return new Brand({
      id: json.id,
      name: json.name,
      website: json.website,
      logo_url: json.logo_url
    });
  }
} 