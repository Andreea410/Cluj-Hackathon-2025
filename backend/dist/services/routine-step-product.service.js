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
exports.RoutineStepProductService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("./base.service");
const routine_step_product_model_1 = require("../models/routine-step-product.model");
let RoutineStepProductService = class RoutineStepProductService extends base_service_1.BaseService {
    constructor(routineStepProductRepository) {
        super(routineStepProductRepository);
        this.routineStepProductRepository = routineStepProductRepository;
    }
    async createRoutineStepProduct(routineStepProduct) {
        const existing = await this.routineStepProductRepository.findByRoutineStepAndProduct(routineStepProduct.routine_step_id, routineStepProduct.product_id);
        if (existing) {
            throw new Error('This product is already associated with this routine step');
        }
        return this.create(routineStepProduct);
    }
    async findByRoutineStepId(routineStepId) {
        return this.routineStepProductRepository.findByRoutineStepId(routineStepId);
    }
    async findByProductId(productId) {
        return this.routineStepProductRepository.findByProductId(productId);
    }
    async findByRoutineStepAndProduct(routineStepId, productId) {
        return this.routineStepProductRepository.findByRoutineStepAndProduct(routineStepId, productId);
    }
    async findWithRelations(id) {
        return this.routineStepProductRepository.findWithRelations(id);
    }
    async findAllWithRelations() {
        return this.routineStepProductRepository.findAllWithRelations();
    }
    async findAllByStepWithProducts(routineStepId) {
        return this.routineStepProductRepository.findAllByStepWithProducts(routineStepId);
    }
    async findAllByProductWithSteps(productId) {
        return this.routineStepProductRepository.findAllByProductWithSteps(productId);
    }
    async bulkCreateRoutineStepProducts(routineStepId, productIds) {
        const results = [];
        for (const productId of productIds) {
            try {
                const association = await this.createRoutineStepProduct(new routine_step_product_model_1.RoutineStepProduct({
                    routine_step_id: routineStepId,
                    product_id: productId
                }));
                results.push(association);
            }
            catch (error) {
                if (!error.message.includes('already associated')) {
                    throw error;
                }
            }
        }
        return results;
    }
    async bulkDeleteRoutineStepProducts(routineStepId, productIds) {
        for (const productId of productIds) {
            const association = await this.findByRoutineStepAndProduct(routineStepId, productId);
            if (association) {
                await this.delete(association.id);
            }
        }
    }
};
exports.RoutineStepProductService = RoutineStepProductService;
exports.RoutineStepProductService = RoutineStepProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], RoutineStepProductService);
//# sourceMappingURL=routine-step-product.service.js.map