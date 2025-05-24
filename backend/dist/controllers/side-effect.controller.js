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
exports.SideEffectController = void 0;
const common_1 = require("@nestjs/common");
const side_effect_service_1 = require("../services/side-effect.service");
const side_effect_model_1 = require("../models/side-effect.model");
let SideEffectController = class SideEffectController {
    constructor(sideEffectService) {
        this.sideEffectService = sideEffectService;
    }
    async createSideEffect(sideEffect) {
        try {
            return await this.sideEffectService.createSideEffect(sideEffect);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getSideEffects(search) {
        try {
            if (search) {
                return await this.sideEffectService.searchSideEffects(search);
            }
            return await this.sideEffectService.findAll();
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async searchByName(query) {
        try {
            return await this.sideEffectService.searchByName(query);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getSideEffect(id) {
        try {
            return await this.sideEffectService.findById(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async updateSideEffect(id, sideEffect) {
        try {
            return await this.sideEffectService.updateSideEffect(id, sideEffect);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteSideEffect(id) {
        try {
            await this.sideEffectService.delete(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.SideEffectController = SideEffectController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [side_effect_model_1.SideEffect]),
    __metadata("design:returntype", Promise)
], SideEffectController.prototype, "createSideEffect", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SideEffectController.prototype, "getSideEffects", null);
__decorate([
    (0, common_1.Get)('search/name'),
    __param(0, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SideEffectController.prototype, "searchByName", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SideEffectController.prototype, "getSideEffect", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SideEffectController.prototype, "updateSideEffect", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SideEffectController.prototype, "deleteSideEffect", null);
exports.SideEffectController = SideEffectController = __decorate([
    (0, common_1.Controller)('side-effects'),
    __metadata("design:paramtypes", [side_effect_service_1.SideEffectService])
], SideEffectController);
//# sourceMappingURL=side-effect.controller.js.map