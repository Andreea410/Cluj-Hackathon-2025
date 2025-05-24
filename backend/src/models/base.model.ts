export abstract class BaseModel {
  id: string;

  protected toJSON() {
    return {
      id: this.id
    };
  }
} 