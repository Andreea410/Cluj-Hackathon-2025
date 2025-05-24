import { IBaseRepository } from './base.repository.interface';
import { PointTransaction } from '../../models/point-transaction.model';
export interface IPointTransactionRepository extends IBaseRepository<PointTransaction> {
    findByUserId(userId: string): Promise<PointTransaction[]>;
    findByAuthUserId(authUserId: string): Promise<PointTransaction[]>;
    findWithUser(id: string): Promise<PointTransaction | null>;
    findAllWithUser(): Promise<PointTransaction[]>;
    findAllByUserWithDetails(userId: string): Promise<PointTransaction[]>;
    getTotalPointsByUser(userId: string): Promise<number>;
}
