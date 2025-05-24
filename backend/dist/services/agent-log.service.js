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
exports.AgentLogService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("./base.service");
let AgentLogService = class AgentLogService extends base_service_1.BaseService {
    constructor(agentLogRepository) {
        super(agentLogRepository);
        this.agentLogRepository = agentLogRepository;
    }
    async createAgentLog(agentLog) {
        this.validateMessage(agentLog.message);
        this.validateRole(agentLog.role);
        return this.create(agentLog);
    }
    async findByUserId(userId) {
        return this.agentLogRepository.findByUserId(userId);
    }
    async findByRole(role) {
        return this.agentLogRepository.findByRole(role);
    }
    async findByUserAndRole(userId, role) {
        return this.agentLogRepository.findByUserAndRole(userId, role);
    }
    async findWithUser(id) {
        return this.agentLogRepository.findWithUser(id);
    }
    async findAllWithUsers() {
        return this.agentLogRepository.findAllWithUsers();
    }
    async findLatestByUser(userId, limit = 10) {
        return this.agentLogRepository.findLatestByUser(userId, limit);
    }
    async updateAgentLog(id, agentLog) {
        const { user_id, ...updateData } = agentLog;
        if (updateData.message) {
            this.validateMessage(updateData.message);
        }
        if (updateData.role) {
            this.validateRole(updateData.role);
        }
        return this.update(id, updateData);
    }
    validateMessage(message) {
        if (!message || typeof message !== 'object') {
            throw new Error('Message must be a valid JSON object');
        }
    }
    validateRole(role) {
        const validRoles = ['user', 'assistant', 'system', 'function'];
        if (!validRoles.includes(role)) {
            throw new Error(`Role must be one of: ${validRoles.join(', ')}`);
        }
    }
};
exports.AgentLogService = AgentLogService;
exports.AgentLogService = AgentLogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], AgentLogService);
//# sourceMappingURL=agent-log.service.js.map