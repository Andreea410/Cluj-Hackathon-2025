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
exports.RoutineTemplateController = void 0;
const common_1 = require("@nestjs/common");
const routine_template_service_1 = require("../services/routine-template.service");
const routine_template_model_1 = require("../models/routine-template.model");
let RoutineTemplateController = class RoutineTemplateController {
    constructor(routineTemplateService) {
        this.routineTemplateService = routineTemplateService;
    }
    async createTemplate(template) {
        try {
            return await this.routineTemplateService.createTemplate(template);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getTemplates(search) {
        try {
            return await this.routineTemplateService.searchTemplates(search);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getTemplatesByName(name) {
        try {
            return await this.routineTemplateService.findByName(name);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getTemplate(id) {
        try {
            const template = await this.routineTemplateService.findById(id);
            if (!template) {
                throw new common_1.HttpException('Template not found', common_1.HttpStatus.NOT_FOUND);
            }
            return template;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async updateTemplate(id, template) {
        try {
            return await this.routineTemplateService.updateTemplate(id, template);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteTemplate(id) {
        try {
            await this.routineTemplateService.delete(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.RoutineTemplateController = RoutineTemplateController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [routine_template_model_1.RoutineTemplate]),
    __metadata("design:returntype", Promise)
], RoutineTemplateController.prototype, "createTemplate", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoutineTemplateController.prototype, "getTemplates", null);
__decorate([
    (0, common_1.Get)('name/:name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoutineTemplateController.prototype, "getTemplatesByName", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoutineTemplateController.prototype, "getTemplate", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoutineTemplateController.prototype, "updateTemplate", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoutineTemplateController.prototype, "deleteTemplate", null);
exports.RoutineTemplateController = RoutineTemplateController = __decorate([
    (0, common_1.Controller)('routine-templates'),
    __metadata("design:paramtypes", [routine_template_service_1.RoutineTemplateService])
], RoutineTemplateController);
//# sourceMappingURL=routine-template.controller.js.map