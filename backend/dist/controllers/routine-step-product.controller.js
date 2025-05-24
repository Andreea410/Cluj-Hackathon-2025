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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutineStepProductController = void 0;
const common_1 = require("@nestjs/common");
const routine_step_product_service_1 = require("../services/routine-step-product.service");
const routine_step_product_model_1 = require("../models/routine-step-product.model");
let RoutineStepProductController = class RoutineStepProductController {
    constructor(routineStepProductService) {
        this.routineStepProductService = routineStepProductService;
    }
    async createRoutineStepProduct(routineStepProduct) {
        try {
            return await this.routineStepProductService.createRoutineStepProduct(routineStepProduct);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async bulkCreateRoutineStepProducts(stepId, data) {
        try {
            return await this.routineStepProductService.bulkCreateRoutineStepProducts(stepId, data.productIds);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getRoutineStepProduct(id, includeRelations) {
        try {
            if (includeRelations) {
                const association = await this.routineStepProductService.findWithRelations(id);
                if (!association)
                    throw new Error('Routine step product association not found');
                return association;
            }
            const association = await this.routineStepProductService.findById(id);
            if (!association)
                throw new Error('Routine step product association not found');
            return association;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getAllRoutineStepProducts(stepId, productId, includeRelations) {
        try {
            if (stepId && productId) {
                const association = await this.routineStepProductService.findByRoutineStepAndProduct(stepId, productId);
                return association ? [association] : [];
            }
            if (stepId) {
                return await this.routineStepProductService.findAllByStepWithProducts(stepId);
            }
            if (productId) {
                return await this.routineStepProductService.findAllByProductWithSteps(productId);
            }
            if (includeRelations) {
                return await this.routineStepProductService.findAllWithRelations();
            }
            return await this.routineStepProductService.findAll();
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async bulkDeleteRoutineStepProducts(stepId, data) {
        try {
            await this.routineStepProductService.bulkDeleteRoutineStepProducts(stepId, data.productIds);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteRoutineStepProduct(id) {
        try {
            await this.routineStepProductService.delete(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.RoutineStepProductController = RoutineStepProductController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof routine_step_product_model_1.RoutineStepProduct !== "undefined" && routine_step_product_model_1.RoutineStepProduct) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], RoutineStepProductController.prototype, "createRoutineStepProduct", null);
__decorate([
    (0, common_1.Post)('step/:stepId/bulk'),
    __param(0, (0, common_1.Param)('stepId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoutineStepProductController.prototype, "bulkCreateRoutineStepProducts", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('includeRelations')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], RoutineStepProductController.prototype, "getRoutineStepProduct", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('stepId')),
    __param(1, (0, common_1.Query)('productId')),
    __param(2, (0, common_1.Query)('includeRelations')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Boolean]),
    __metadata("design:returntype", Promise)
], RoutineStepProductController.prototype, "getAllRoutineStepProducts", null);
__decorate([
    (0, common_1.Delete)('step/:stepId/products'),
    __param(0, (0, common_1.Param)('stepId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoutineStepProductController.prototype, "bulkDeleteRoutineStepProducts", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoutineStepProductController.prototype, "deleteRoutineStepProduct", null);
exports.RoutineStepProductController = RoutineStepProductController = __decorate([
    (0, common_1.Controller)('routine-step-products'),
    __metadata("design:paramtypes", [routine_step_product_service_1.RoutineStepProductService])
], RoutineStepProductController);
//# sourceMappingURL=routine-step-product.controller.js.map