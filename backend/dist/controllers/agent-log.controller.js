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
exports.AgentLogController = void 0;
const common_1 = require("@nestjs/common");
const agent_log_service_1 = require("../services/agent-log.service");
const agent_log_model_1 = require("../models/agent-log.model");
let AgentLogController = class AgentLogController {
    constructor(agentLogService) {
        this.agentLogService = agentLogService;
    }
    async createAgentLog(agentLog) {
        try {
            return await this.agentLogService.createAgentLog(agentLog);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getAgentLog(id, includeUser) {
        try {
            if (includeUser) {
                const log = await this.agentLogService.findWithUser(id);
                if (!log)
                    throw new Error('Agent log not found');
                return log;
            }
            return await this.agentLogService.findById(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getAllAgentLogs(userId, role, limit, includeUsers) {
        try {
            if (userId && role) {
                return await this.agentLogService.findByUserAndRole(userId, role);
            }
            if (userId && limit) {
                return await this.agentLogService.findLatestByUser(userId, parseInt(limit));
            }
            if (userId) {
                return await this.agentLogService.findByUserId(userId);
            }
            if (role) {
                return await this.agentLogService.findByRole(role);
            }
            if (includeUsers) {
                return await this.agentLogService.findAllWithUsers();
            }
            return await this.agentLogService.findAll();
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateAgentLog(id, agentLog) {
        try {
            return await this.agentLogService.updateAgentLog(id, agentLog);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteAgentLog(id) {
        try {
            await this.agentLogService.delete(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.AgentLogController = AgentLogController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [agent_log_model_1.AgentLog]),
    __metadata("design:returntype", Promise)
], AgentLogController.prototype, "createAgentLog", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('includeUser')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], AgentLogController.prototype, "getAgentLog", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Query)('role')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('includeUsers')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Boolean]),
    __metadata("design:returntype", Promise)
], AgentLogController.prototype, "getAllAgentLogs", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AgentLogController.prototype, "updateAgentLog", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AgentLogController.prototype, "deleteAgentLog", null);
exports.AgentLogController = AgentLogController = __decorate([
    (0, common_1.Controller)('agent-logs'),
    __metadata("design:paramtypes", [agent_log_service_1.AgentLogService])
], AgentLogController);
//# sourceMappingURL=agent-log.controller.js.map