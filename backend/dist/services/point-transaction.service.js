"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointTransactionService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("./base.service");
const point_transaction_model_1 = require("../models/point-transaction.model");
const point_transaction_repository_1 = require("../repositories/point-transaction.repository");
let PointTransactionService = class PointTransactionService extends base_service_1.BaseService {
    constructor(pointTransactionRepository) {
        super(pointTransactionRepository);
        this.pointTransactionRepository = pointTransactionRepository;
    }
    async createPointTransaction(pointTransaction) {
        if (!Number.isInteger(pointTransaction.points)) {
            throw new Error('Points must be an integer value');
        }
        return this.create(pointTransaction);
    }
    async findByUserId(userId) {
        return this.pointTransactionRepository.findByUserId(userId);
    }
    async findByAuthUserId(authUserId) {
        return this.pointTransactionRepository.findByAuthUserId(authUserId);
    }
    async findWithUser(id) {
        return this.pointTransactionRepository.findWithUser(id);
    }
    async findAllWithUser() {
        return this.pointTransactionRepository.findAllWithUser();
    }
    async findAllByUserWithDetails(userId) {
        return this.pointTransactionRepository.findAllByUserWithDetails(userId);
    }
    async getTotalPointsByUser(userId) {
        return this.pointTransactionRepository.getTotalPointsByUser(userId);
    }
    async updatePointTransaction(id, pointTransaction) {
        if (pointTransaction.points !== undefined && !Number.isInteger(pointTransaction.points)) {
            throw new Error('Points must be an integer value');
        }
        return this.update(id, pointTransaction);
    }
    async bulkCreatePointTransactions(transactions) {
        const results = [];
        for (const transaction of transactions) {
            if (!Number.isInteger(transaction.points)) {
                throw new Error('Points must be an integer value');
            }
        }
        for (const transaction of transactions) {
            const created = await this.createPointTransaction(new point_transaction_model_1.PointTransaction(transaction));
            results.push(created);
        }
        return results;
    }
};
exports.PointTransactionService = PointTransactionService;
exports.PointTransactionService = PointTransactionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [point_transaction_repository_1.PointTransactionRepository])
], PointTransactionService);
//# sourceMappingURL=point-transaction.service.js.map