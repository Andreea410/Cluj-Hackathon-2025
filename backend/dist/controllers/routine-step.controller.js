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
exports.RoutineStepController = void 0;
const common_1 = require("@nestjs/common");
const routine_step_service_1 = require("../services/routine-step.service");
const routine_step_model_1 = require("../models/routine-step.model");
let RoutineStepController = class RoutineStepController {
    constructor(routineStepService) {
        this.routineStepService = routineStepService;
    }
    async createRoutineStep(routineStep) {
        try {
            return await this.routineStepService.createRoutineStep(routineStep);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async bulkCreateRoutineSteps(templateId, data) {
        try {
            return await this.routineStepService.bulkCreateRoutineSteps(templateId, data.steps);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getRoutineStep(id, includeTemplate) {
        try {
            if (includeTemplate) {
                const step = await this.routineStepService.findWithTemplate(id);
                if (!step)
                    throw new Error('Routine step not found');
                return step;
            }
            const step = await this.routineStepService.findById(id);
            if (!step)
                throw new Error('Routine step not found');
            return step;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getAllRoutineSteps(templateId, stepNumber, includeTemplate) {
        try {
            if (templateId && stepNumber) {
                const step = await this.routineStepService.findByStepNumber(templateId, stepNumber);
                return step ? [step] : [];
            }
            if (templateId && includeTemplate) {
                return await this.routineStepService.findAllByTemplateWithDetails(templateId);
            }
            if (templateId) {
                return await this.routineStepService.findByRoutineTemplateId(templateId);
            }
            if (includeTemplate) {
                return await this.routineStepService.findAllWithTemplate();
            }
            return await this.routineStepService.findAll();
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateRoutineStep(id, routineStep) {
        try {
            return await this.routineStepService.updateRoutineStep(id, routineStep);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteRoutineStep(id) {
        try {
            await this.routineStepService.deleteRoutineStep(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.RoutineStepController = RoutineStepController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof routine_step_model_1.RoutineStep !== "undefined" && routine_step_model_1.RoutineStep) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], RoutineStepController.prototype, "createRoutineStep", null);
__decorate([
    (0, common_1.Post)('template/:templateId/bulk'),
    __param(0, (0, common_1.Param)('templateId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoutineStepController.prototype, "bulkCreateRoutineSteps", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('includeTemplate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], RoutineStepController.prototype, "getRoutineStep", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('templateId')),
    __param(1, (0, common_1.Query)('stepNumber')),
    __param(2, (0, common_1.Query)('includeTemplate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Boolean]),
    __metadata("design:returntype", Promise)
], RoutineStepController.prototype, "getAllRoutineSteps", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoutineStepController.prototype, "updateRoutineStep", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoutineStepController.prototype, "deleteRoutineStep", null);
exports.RoutineStepController = RoutineStepController = __decorate([
    (0, common_1.Controller)('routine-steps'),
    __metadata("design:paramtypes", [routine_step_service_1.RoutineStepService])
], RoutineStepController);
//# sourceMappingURL=routine-step.controller.js.map