import { BaseService } from './base.service';
import { PointTransaction } from '../models/point-transaction.model';
import { PointTransactionRepository } from '../repositories/point-transaction.repository';
export declare class PointTransactionService extends BaseService<PointTransaction> {
    private readonly pointTransactionRepository;
    constructor(pointTransactionRepository: PointTransactionRepository);
    createPointTransaction(pointTransaction: PointTransaction): Promise<PointTransaction>;
    findByUserId(userId: string): Promise<PointTransaction[]>;
    findByAuthUserId(authUserId: string): Promise<PointTransaction[]>;
    findWithUser(id: string): Promise<PointTransaction | null>;
    findAllWithUser(): Promise<PointTransaction[]>;
    findAllByUserWithDetails(userId: string): Promise<PointTransaction[]>;
    getTotalPointsByUser(userId: string): Promise<number>;
    updatePointTransaction(id: string, pointTransaction: Partial<PointTransaction>): Promise<PointTransaction>;
    bulkCreatePointTransactions(transactions: Array<Omit<PointTransaction, 'id'>>): Promise<PointTransaction[]>;
}
