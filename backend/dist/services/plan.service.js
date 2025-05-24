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
exports.PlanService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("./base.service");
let PlanService = class PlanService extends base_service_1.BaseService {
    constructor(planRepository) {
        super(planRepository);
        this.planRepository = planRepository;
    }
    async createPlan(plan) {
        const existingPlan = await this.planRepository.findByName(plan.name);
        if (existingPlan) {
            throw new Error('A plan with this name already exists');
        }
        return this.create(plan);
    }
    async updatePlan(id, plan) {
        if (plan.name) {
            const existingPlan = await this.planRepository.findByName(plan.name);
            if (existingPlan && existingPlan.id !== id) {
                throw new Error('A plan with this name already exists');
            }
        }
        return this.update(id, plan);
    }
    async findByPriceRange(minPrice, maxPrice) {
        return this.planRepository.findByPriceRange(minPrice, maxPrice);
    }
};
exports.PlanService = PlanService;
exports.PlanService = PlanService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], PlanService);
//# sourceMappingURL=plan.service.js.map