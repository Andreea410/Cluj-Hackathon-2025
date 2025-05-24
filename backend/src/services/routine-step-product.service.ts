import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { RoutineStepProduct } from '../models/routine-step-product.model';
import { IRoutineStepProductRepository } from '../repositories/interfaces/routine-step-product.repository.interface';

@Injectable()
export class RoutineStepProductService extends BaseService<RoutineStepProduct> {
  constructor(private readonly routineStepProductRepository: IRoutineStepProductRepository) {
    super(routineStepProductRepository);
  }

  async createRoutineStepProduct(routineStepProduct: RoutineStepProduct): Promise<RoutineStepProduct> {
    // Check for existing association
    const existing = await this.routineStepProductRepository.findByRoutineStepAndProduct(
      routineStepProduct.routine_step_id,
      routineStepProduct.product_id
    );

    if (existing) {
      throw new Error('This product is already associated with this routine step');
    }

    return this.create(routineStepProduct);
  }

  async findByRoutineStepId(routineStepId: string): Promise<RoutineStepProduct[]> {
    return this.routineStepProductRepository.findByRoutineStepId(routineStepId);
  }

  async findByProductId(productId: string): Promise<RoutineStepProduct[]> {
    return this.routineStepProductRepository.findByProductId(productId);
  }

  async findByRoutineStepAndProduct(routineStepId: string, productId: string): Promise<RoutineStepProduct | null> {
    return this.routineStepProductRepository.findByRoutineStepAndProduct(routineStepId, productId);
  }

  async findWithRelations(id: string): Promise<RoutineStepProduct | null> {
    return this.routineStepProductRepository.findWithRelations(id);
  }

  async findAllWithRelations(): Promise<RoutineStepProduct[]> {
    return this.routineStepProductRepository.findAllWithRelations();
  }

  async findAllByStepWithProducts(routineStepId: string): Promise<RoutineStepProduct[]> {
    return this.routineStepProductRepository.findAllByStepWithProducts(routineStepId);
  }

  async findAllByProductWithSteps(productId: string): Promise<RoutineStepProduct[]> {
    return this.routineStepProductRepository.findAllByProductWithSteps(productId);
  }

  async bulkCreateRoutineStepProducts(
    routineStepId: string,
    productIds: string[]
  ): Promise<RoutineStepProduct[]> {
    const results: RoutineStepProduct[] = [];

    // Process all products
    for (const productId of productIds) {
      try {
        const association = await this.createRoutineStepProduct(new RoutineStepProduct({
          routine_step_id: routineStepId,
          product_id: productId
        }));
        results.push(association);
      } catch (error) {
        // Skip if association already exists
        if (!error.message.includes('already associated')) {
          throw error;
        }
      }
    }

    return results;
  }

  async bulkDeleteRoutineStepProducts(
    routineStepId: string,
    productIds: string[]
  ): Promise<void> {
    for (const productId of productIds) {
      const association = await this.findByRoutineStepAndProduct(routineStepId, productId);
      if (association) {
        await this.delete(association.id);
      }
    }
  }
} 