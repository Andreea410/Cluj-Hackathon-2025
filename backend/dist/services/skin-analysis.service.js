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
var SkinAnalysisService_1;
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkinAnalysisService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("./base.service");
const skin_analysis_model_1 = require("../models/skin-analysis.model");
const skin_analysis_repository_1 = require("../repositories/skin-analysis.repository");
const agent_log_service_1 = require("./agent-log.service");
const agent_log_model_1 = require("../models/agent-log.model");
let SkinAnalysisService = SkinAnalysisService_1 = class SkinAnalysisService extends base_service_1.BaseService {
    constructor(skinAnalysisRepository, agentLogService) {
        super(skinAnalysisRepository);
        this.skinAnalysisRepository = skinAnalysisRepository;
        this.agentLogService = agentLogService;
        this.logger = new common_1.Logger(SkinAnalysisService_1.name);
    }
    async findByUserId(userId) {
        return this.skinAnalysisRepository.findByUserId(userId);
    }
    async startAnalysis(userId) {
        const existingAnalysis = await this.findByUserId(userId);
        if (existingAnalysis) {
            return existingAnalysis;
        }
        const initialMessage = {
            role: 'assistant',
            content: 'Hello! I\'m here to help you understand your skin better. Let\'s start by discussing your skin concerns. What are the main issues you\'d like to address?'
        };
        const initialSkinInfo = {
            skin_type: null,
            concerns: [],
            breakouts_frequency: null,
            allergies: [],
            current_products: []
        };
        const analysis = new skin_analysis_model_1.SkinAnalysis({
            user_id: userId,
            messages: [initialMessage],
            skin_info: initialSkinInfo
        });
        return this.create(analysis);
    }
    async processUserResponse(userId, response) {
        const analysis = await this.findByUserId(userId);
        if (!analysis) {
            throw new Error('No active skin analysis found for this user');
        }
        analysis.messages.push({
            role: 'user',
            content: response
        });
        this.updateSkinInfo(analysis, response);
        const nextMessage = this.generateNextMessage(analysis);
        analysis.messages.push(nextMessage);
        return this.update(analysis.id, analysis);
    }
    updateSkinInfo(analysis, response) {
        const skinInfo = analysis.skin_info;
        if (response.toLowerCase().includes('oily')) {
            skinInfo.skin_type = 'oily';
        }
        else if (response.toLowerCase().includes('dry')) {
            skinInfo.skin_type = 'dry';
        }
        else if (response.toLowerCase().includes('combination')) {
            skinInfo.skin_type = 'combination';
        }
        else if (response.toLowerCase().includes('normal')) {
            skinInfo.skin_type = 'normal';
        }
        const concerns = ['acne', 'wrinkles', 'dark spots', 'redness', 'sensitivity'];
        concerns.forEach(concern => {
            if (response.toLowerCase().includes(concern) && !skinInfo.concerns.includes(concern)) {
                skinInfo.concerns.push(concern);
            }
        });
        if (response.toLowerCase().includes('rarely')) {
            skinInfo.breakouts_frequency = 'rare';
        }
        else if (response.toLowerCase().includes('sometimes')) {
            skinInfo.breakouts_frequency = 'occasional';
        }
        else if (response.toLowerCase().includes('often')) {
            skinInfo.breakouts_frequency = 'frequent';
        }
        else if (response.toLowerCase().includes('always')) {
            skinInfo.breakouts_frequency = 'constant';
        }
    }
    generateNextMessage(analysis) {
        const lastMessage = analysis.messages[analysis.messages.length - 1];
        const skinInfo = analysis.skin_info;
        let content = '';
        if (!skinInfo.skin_type) {
            content = 'Could you tell me more about your skin type? Is it oily, dry, combination, or normal?';
        }
        else if (skinInfo.concerns.length === 0) {
            content = 'What specific skin concerns would you like to address?';
        }
        else if (!skinInfo.breakouts_frequency) {
            content = 'How often do you experience breakouts?';
        }
        else {
            content = 'Thank you for sharing that information. Based on what you\'ve told me, I can help you develop a personalized skincare routine. Would you like to proceed with creating a routine?';
        }
        return {
            role: 'assistant',
            content
        };
    }
    async processResponse(userId, message) {
        const userLog = new agent_log_model_1.AgentLog({
            user_id: userId,
            role: 'user',
            message: {
                type: 'text',
                content: message
            }
        });
        await this.agentLogService.create(userLog);
        const response = await this.generateResponse(userId, message);
        const aiLog = new agent_log_model_1.AgentLog({
            user_id: userId,
            role: 'assistant',
            message: {
                type: 'text',
                content: response
            }
        });
        return this.agentLogService.create(aiLog);
    }
    async getHistory(userId) {
        return this.agentLogService.findByUserId(userId);
    }
};
exports.SkinAnalysisService = SkinAnalysisService;
exports.SkinAnalysisService = SkinAnalysisService = SkinAnalysisService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof skin_analysis_repository_1.SkinAnalysisRepository !== "undefined" && skin_analysis_repository_1.SkinAnalysisRepository) === "function" ? _a : Object, agent_log_service_1.AgentLogService])
], SkinAnalysisService);
//# sourceMappingURL=skin-analysis.service.js.map