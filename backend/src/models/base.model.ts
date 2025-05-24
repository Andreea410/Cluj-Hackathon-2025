export abstract class BaseModel {
  id: string;

  toJSON(): Record<string, any> {
    return {
      id: this.id
    };
  }
} 