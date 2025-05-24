import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { PointTransaction } from '../models/point-transaction.model';
import { IPointTransactionRepository } from '../repositories/interfaces/point-transaction.repository.interface';

@Injectable()
export class PointTransactionService extends BaseService<PointTransaction> {
  constructor(private readonly pointTransactionRepository: IPointTransactionRepository) {
    super(pointTransactionRepository);
  }

  async createPointTransaction(pointTransaction: PointTransaction): Promise<PointTransaction> {
    // Validate points value
    if (!Number.isInteger(pointTransaction.points)) {
      throw new Error('Points must be an integer value');
    }

    return this.create(pointTransaction);
  }

  async findByUserId(userId: string): Promise<PointTransaction[]> {
    return this.pointTransactionRepository.findByUserId(userId);
  }

  async findByAuthUserId(authUserId: string): Promise<PointTransaction[]> {
    return this.pointTransactionRepository.findByAuthUserId(authUserId);
  }

  async findWithUser(id: string): Promise<PointTransaction | null> {
    return this.pointTransactionRepository.findWithUser(id);
  }

  async findAllWithUser(): Promise<PointTransaction[]> {
    return this.pointTransactionRepository.findAllWithUser();
  }

  async findAllByUserWithDetails(userId: string): Promise<PointTransaction[]> {
    return this.pointTransactionRepository.findAllByUserWithDetails(userId);
  }

  async getTotalPointsByUser(userId: string): Promise<number> {
    return this.pointTransactionRepository.getTotalPointsByUser(userId);
  }

  async updatePointTransaction(
    id: string,
    pointTransaction: Partial<PointTransaction>
  ): Promise<PointTransaction> {
    // Validate points value if it's being updated
    if (pointTransaction.points !== undefined && !Number.isInteger(pointTransaction.points)) {
      throw new Error('Points must be an integer value');
    }

    return this.update(id, pointTransaction);
  }

  async bulkCreatePointTransactions(
    transactions: Array<Omit<PointTransaction, 'id'>>
  ): Promise<PointTransaction[]> {
    const results: PointTransaction[] = [];

    // Validate all transactions before processing
    for (const transaction of transactions) {
      if (!Number.isInteger(transaction.points)) {
        throw new Error('Points must be an integer value');
      }
    }

    // Process all transactions
    for (const transaction of transactions) {
      const created = await this.createPointTransaction(new PointTransaction(transaction));
      results.push(created);
    }

    return results;
  }
} 