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
exports.RoutineTemplateService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("./base.service");
let RoutineTemplateService = class RoutineTemplateService extends base_service_1.BaseService {
    constructor(routineTemplateRepository) {
        super(routineTemplateRepository);
        this.routineTemplateRepository = routineTemplateRepository;
    }
    async createTemplate(template) {
        if (!template.name) {
            throw new Error('Template name is required');
        }
        if (!template.description) {
            throw new Error('Template description is required');
        }
        const existing = await this.routineTemplateRepository.findByNameExact(template.name);
        if (existing) {
            throw new Error('A template with this name already exists');
        }
        return this.create(template);
    }
    async updateTemplate(id, template) {
        if (template.name === '') {
            throw new Error('Template name cannot be empty');
        }
        if (template.description === '') {
            throw new Error('Template description cannot be empty');
        }
        const existing = await this.findById(id);
        if (!existing) {
            throw new Error('Template not found');
        }
        if (template.name) {
            const duplicate = await this.routineTemplateRepository.findByNameExact(template.name);
            if (duplicate && duplicate.id !== id) {
                throw new Error('A template with this name already exists');
            }
        }
        return this.update(id, template);
    }
    async searchTemplates(query) {
        if (!query) {
            return this.findAll();
        }
        return this.routineTemplateRepository.searchTemplates(query);
    }
    async findByName(name) {
        return this.routineTemplateRepository.findByName(name);
    }
};
exports.RoutineTemplateService = RoutineTemplateService;
exports.RoutineTemplateService = RoutineTemplateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], RoutineTemplateService);
//# sourceMappingURL=routine-template.service.js.map