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
exports.RoutineAdjustmentService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("./base.service");
let RoutineAdjustmentService = class RoutineAdjustmentService extends base_service_1.BaseService {
    constructor(routineAdjustmentRepository) {
        super(routineAdjustmentRepository);
        this.routineAdjustmentRepository = routineAdjustmentRepository;
    }
    async createRoutineAdjustment(routineAdjustment) {
        this.validateActions(routineAdjustment.actions);
        return this.create(routineAdjustment);
    }
    async findByUserId(userId) {
        return this.routineAdjustmentRepository.findByUserId(userId);
    }
    async findByPhotoAnalysisId(photoAnalysisId) {
        return this.routineAdjustmentRepository.findByPhotoAnalysisId(photoAnalysisId);
    }
    async findByAuthUserId(authUserId) {
        return this.routineAdjustmentRepository.findByAuthUserId(authUserId);
    }
    async findWithRelations(id) {
        return this.routineAdjustmentRepository.findWithRelations(id);
    }
    async findAllWithRelations() {
        return this.routineAdjustmentRepository.findAllWithRelations();
    }
    async updateRoutineAdjustment(id, routineAdjustment) {
        const { user_id, photo_analysis_id, ...updateData } = routineAdjustment;
        if (updateData.actions) {
            this.validateActions(updateData.actions);
        }
        return this.update(id, updateData);
    }
    validateActions(actions) {
        if (!actions || typeof actions !== 'object') {
            throw new Error('Actions must be a valid JSON object');
        }
    }
};
exports.RoutineAdjustmentService = RoutineAdjustmentService;
exports.RoutineAdjustmentService = RoutineAdjustmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], RoutineAdjustmentService);
//# sourceMappingURL=routine-adjustment.service.js.map