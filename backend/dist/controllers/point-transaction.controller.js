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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointTransactionController = void 0;
const common_1 = require("@nestjs/common");
const point_transaction_service_1 = require("../services/point-transaction.service");
const point_transaction_model_1 = require("../models/point-transaction.model");
let PointTransactionController = class PointTransactionController {
    constructor(pointTransactionService) {
        this.pointTransactionService = pointTransactionService;
    }
    async createPointTransaction(pointTransaction) {
        try {
            return await this.pointTransactionService.createPointTransaction(pointTransaction);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async bulkCreatePointTransactions(data) {
        try {
            return await this.pointTransactionService.bulkCreatePointTransactions(data.transactions);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getPointTransaction(id, includeUser) {
        try {
            if (includeUser) {
                const transaction = await this.pointTransactionService.findWithUser(id);
                if (!transaction)
                    throw new Error('Point transaction not found');
                return transaction;
            }
            return await this.pointTransactionService.findById(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getAllPointTransactions(userId, authUserId, includeUser) {
        try {
            if (userId && includeUser) {
                const transactions = await this.pointTransactionService.findAllByUserWithDetails(userId);
                const totalPoints = await this.pointTransactionService.getTotalPointsByUser(userId);
                return { transactions, totalPoints };
            }
            if (userId) {
                return await this.pointTransactionService.findByUserId(userId);
            }
            if (authUserId) {
                return await this.pointTransactionService.findByAuthUserId(authUserId);
            }
            if (includeUser) {
                return await this.pointTransactionService.findAllWithUser();
            }
            return await this.pointTransactionService.findAll();
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getTotalPointsByUser(userId) {
        try {
            const totalPoints = await this.pointTransactionService.getTotalPointsByUser(userId);
            return { totalPoints };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updatePointTransaction(id, pointTransaction) {
        try {
            return await this.pointTransactionService.updatePointTransaction(id, pointTransaction);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deletePointTransaction(id) {
        try {
            await this.pointTransactionService.delete(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.PointTransactionController = PointTransactionController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [point_transaction_model_1.PointTransaction]),
    __metadata("design:returntype", Promise)
], PointTransactionController.prototype, "createPointTransaction", null);
__decorate([
    (0, common_1.Post)('bulk'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PointTransactionController.prototype, "bulkCreatePointTransactions", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('includeUser')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], PointTransactionController.prototype, "getPointTransaction", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Query)('authUserId')),
    __param(2, (0, common_1.Query)('includeUser')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Boolean]),
    __metadata("design:returntype", Promise)
], PointTransactionController.prototype, "getAllPointTransactions", null);
__decorate([
    (0, common_1.Get)('user/:userId/total'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PointTransactionController.prototype, "getTotalPointsByUser", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PointTransactionController.prototype, "updatePointTransaction", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PointTransactionController.prototype, "deletePointTransaction", null);
exports.PointTransactionController = PointTransactionController = __decorate([
    (0, common_1.Controller)('point-transactions'),
    __metadata("design:paramtypes", [point_transaction_service_1.PointTransactionService])
], PointTransactionController);
//# sourceMappingURL=point-transaction.controller.js.map