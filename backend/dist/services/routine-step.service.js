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
exports.RoutineStepService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("./base.service");
const routine_step_model_1 = require("../models/routine-step.model");
let RoutineStepService = class RoutineStepService extends base_service_1.BaseService {
    constructor(routineStepRepository) {
        super(routineStepRepository);
        this.routineStepRepository = routineStepRepository;
    }
    async createRoutineStep(routineStep) {
        if (!Number.isInteger(routineStep.step_number) || routineStep.step_number < 1) {
            throw new Error('Step number must be a positive integer');
        }
        const existing = await this.routineStepRepository.findByStepNumber(routineStep.routine_template_id, routineStep.step_number);
        if (existing) {
            throw new Error('A step with this number already exists in this template');
        }
        return this.create(routineStep);
    }
    async findByRoutineTemplateId(routineTemplateId) {
        return this.routineStepRepository.findByRoutineTemplateId(routineTemplateId);
    }
    async findByStepNumber(routineTemplateId, stepNumber) {
        if (!Number.isInteger(stepNumber) || stepNumber < 1) {
            throw new Error('Step number must be a positive integer');
        }
        return this.routineStepRepository.findByStepNumber(routineTemplateId, stepNumber);
    }
    async findWithTemplate(id) {
        return this.routineStepRepository.findWithTemplate(id);
    }
    async findAllWithTemplate() {
        return this.routineStepRepository.findAllWithTemplate();
    }
    async findAllByTemplateWithDetails(routineTemplateId) {
        return this.routineStepRepository.findAllByTemplateWithDetails(routineTemplateId);
    }
    async updateRoutineStep(id, routineStep) {
        const current = await this.findById(id);
        if (!current) {
            throw new Error('Routine step not found');
        }
        if (routineStep.step_number !== undefined) {
            if (!Number.isInteger(routineStep.step_number) || routineStep.step_number < 1) {
                throw new Error('Step number must be a positive integer');
            }
            const templateId = routineStep.routine_template_id || current.routine_template_id;
            const existing = await this.routineStepRepository.findByStepNumber(templateId, routineStep.step_number);
            if (existing && existing.id !== id) {
                throw new Error('A step with this number already exists in this template');
            }
            if (routineStep.step_number !== current.step_number) {
                await this.routineStepRepository.reorderSteps(templateId, current.step_number);
            }
        }
        return this.update(id, routineStep);
    }
    async bulkCreateRoutineSteps(routineTemplateId, steps) {
        const results = [];
        let maxStepNumber = await this.routineStepRepository.getMaxStepNumber(routineTemplateId);
        for (const step of steps) {
            maxStepNumber++;
            const created = await this.createRoutineStep(new routine_step_model_1.RoutineStep({
                ...step,
                routine_template_id: routineTemplateId,
                step_number: maxStepNumber
            }));
            results.push(created);
        }
        return results;
    }
    async deleteRoutineStep(id) {
        const step = await this.findById(id);
        if (!step) {
            throw new Error('Routine step not found');
        }
        await this.delete(id);
        await this.routineStepRepository.reorderSteps(step.routine_template_id, step.step_number);
    }
};
exports.RoutineStepService = RoutineStepService;
exports.RoutineStepService = RoutineStepService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], RoutineStepService);
//# sourceMappingURL=routine-step.service.js.map