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
exports.RoutineAdjustmentController = void 0;
const common_1 = require("@nestjs/common");
const routine_adjustment_service_1 = require("../services/routine-adjustment.service");
const routine_adjustment_model_1 = require("../models/routine-adjustment.model");
let RoutineAdjustmentController = class RoutineAdjustmentController {
    constructor(routineAdjustmentService) {
        this.routineAdjustmentService = routineAdjustmentService;
    }
    async createRoutineAdjustment(routineAdjustment) {
        try {
            return await this.routineAdjustmentService.createRoutineAdjustment(routineAdjustment);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getRoutineAdjustment(id, includeRelations) {
        try {
            if (includeRelations) {
                const adjustment = await this.routineAdjustmentService.findWithRelations(id);
                if (!adjustment)
                    throw new Error('Routine adjustment not found');
                return adjustment;
            }
            return await this.routineAdjustmentService.findById(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getAllRoutineAdjustments(userId, photoAnalysisId, authUserId, includeRelations) {
        try {
            if (userId) {
                return await this.routineAdjustmentService.findByUserId(userId);
            }
            if (photoAnalysisId) {
                return await this.routineAdjustmentService.findByPhotoAnalysisId(photoAnalysisId);
            }
            if (authUserId) {
                return await this.routineAdjustmentService.findByAuthUserId(authUserId);
            }
            if (includeRelations) {
                return await this.routineAdjustmentService.findAllWithRelations();
            }
            return await this.routineAdjustmentService.findAll();
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateRoutineAdjustment(id, routineAdjustment) {
        try {
            return await this.routineAdjustmentService.updateRoutineAdjustment(id, routineAdjustment);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteRoutineAdjustment(id) {
        try {
            await this.routineAdjustmentService.delete(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.RoutineAdjustmentController = RoutineAdjustmentController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [routine_adjustment_model_1.RoutineAdjustment]),
    __metadata("design:returntype", Promise)
], RoutineAdjustmentController.prototype, "createRoutineAdjustment", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('includeRelations')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], RoutineAdjustmentController.prototype, "getRoutineAdjustment", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Query)('photoAnalysisId')),
    __param(2, (0, common_1.Query)('authUserId')),
    __param(3, (0, common_1.Query)('includeRelations')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Boolean]),
    __metadata("design:returntype", Promise)
], RoutineAdjustmentController.prototype, "getAllRoutineAdjustments", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoutineAdjustmentController.prototype, "updateRoutineAdjustment", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoutineAdjustmentController.prototype, "deleteRoutineAdjustment", null);
exports.RoutineAdjustmentController = RoutineAdjustmentController = __decorate([
    (0, common_1.Controller)('routine-adjustments'),
    __metadata("design:paramtypes", [routine_adjustment_service_1.RoutineAdjustmentService])
], RoutineAdjustmentController);
//# sourceMappingURL=routine-adjustment.controller.js.map