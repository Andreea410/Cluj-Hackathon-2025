import { PointTransactionService } from '../services/point-transaction.service';
import { PointTransaction } from '../models/point-transaction.model';
export declare class PointTransactionController {
    private readonly pointTransactionService;
    constructor(pointTransactionService: PointTransactionService);
    createPointTransaction(pointTransaction: PointTransaction): Promise<PointTransaction>;
    bulkCreatePointTransactions(data: {
        transactions: Array<Omit<PointTransaction, 'id'>>;
    }): Promise<PointTransaction[]>;
    getPointTransaction(id: string, includeUser?: boolean): Promise<PointTransaction>;
    getAllPointTransactions(userId?: string, authUserId?: string, includeUser?: boolean): Promise<PointTransaction[] | {
        transactions: PointTransaction[];
        totalPoints: number;
    }>;
    getTotalPointsByUser(userId: string): Promise<{
        totalPoints: number;
    }>;
    updatePointTransaction(id: string, pointTransaction: Partial<PointTransaction>): Promise<PointTransaction>;
    deletePointTransaction(id: string): Promise<void>;
}
