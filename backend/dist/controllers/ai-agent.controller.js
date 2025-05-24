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
exports.AIAgentController = void 0;
const common_1 = require("@nestjs/common");
const ai_agent_service_1 = require("../services/ai-agent.service");
const skin_profile_model_1 = require("../models/skin-profile.model");
let AIAgentController = class AIAgentController {
    constructor(aiAgentService) {
        this.aiAgentService = aiAgentService;
    }
    async analyzeSkinProfile(profile) {
        try {
            return await this.aiAgentService.analyzeSkinProfile(profile);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async analyzeProgress(analyses) {
        try {
            return await this.aiAgentService.analyzeProgress(analyses);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.AIAgentController = AIAgentController;
__decorate([
    (0, common_1.Post)('analyze-profile'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [skin_profile_model_1.SkinProfile]),
    __metadata("design:returntype", Promise)
], AIAgentController.prototype, "analyzeSkinProfile", null);
__decorate([
    (0, common_1.Post)('analyze-progress'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], AIAgentController.prototype, "analyzeProgress", null);
exports.AIAgentController = AIAgentController = __decorate([
    (0, common_1.Controller)('ai-agent'),
    __metadata("design:paramtypes", [ai_agent_service_1.AIAgentService])
], AIAgentController);
//# sourceMappingURL=ai-agent.controller.js.map