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
exports.UserRoutineLogController = void 0;
const common_1 = require("@nestjs/common");
const user_routine_log_service_1 = require("../services/user-routine-log.service");
const user_routine_log_model_1 = require("../models/user-routine-log.model");
let UserRoutineLogController = class UserRoutineLogController {
    constructor(userRoutineLogService) {
        this.userRoutineLogService = userRoutineLogService;
    }
    async logRoutineProgress(userRoutineLog) {
        try {
            return await this.userRoutineLogService.logRoutineProgress(userRoutineLog);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async bulkCreateLogs(userRoutineId, data) {
        try {
            const formattedLogs = data.logs.map(log => ({
                logDate: new Date(log.logDate),
                completedSteps: log.completedSteps
            }));
            return await this.userRoutineLogService.bulkCreateLogs(userRoutineId, formattedLogs);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getRoutineLog(id, includeRelations) {
        try {
            if (includeRelations) {
                const log = await this.userRoutineLogService.findWithRelations(id);
                if (!log)
                    throw new Error('User routine log not found');
                return log;
            }
            const log = await this.userRoutineLogService.findById(id);
            if (!log)
                throw new Error('User routine log not found');
            return log;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getRoutineLogs(userRoutineId, authUserId, includeRelations, startDate, endDate, date, limit) {
        try {
            if (date) {
                return await this.userRoutineLogService.findByDate(new Date(date));
            }
            if (startDate && endDate) {
                if (userRoutineId) {
                    return await this.userRoutineLogService.findAllByUserRoutineBetweenDates(userRoutineId, new Date(startDate), new Date(endDate));
                }
                return await this.userRoutineLogService.findAllBetweenDates(new Date(startDate), new Date(endDate));
            }
            if (userRoutineId) {
                return await this.userRoutineLogService.findAllByUserRoutineWithDetails(userRoutineId);
            }
            if (authUserId) {
                return await this.userRoutineLogService.findByAuthUserId(authUserId);
            }
            if (limit) {
                return await this.userRoutineLogService.findRecentLogs(limit);
            }
            if (includeRelations) {
                return await this.userRoutineLogService.findAllWithRelations();
            }
            return await this.userRoutineLogService.findAll();
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getRoutineStats(userRoutineId) {
        try {
            return await this.userRoutineLogService.getCompletionStats(userRoutineId);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateRoutineLog(id, userRoutineLog) {
        try {
            return await this.userRoutineLogService.updateRoutineLog(id, userRoutineLog);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteRoutineLog(id) {
        try {
            await this.userRoutineLogService.delete(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.UserRoutineLogController = UserRoutineLogController;
__decorate([
    (0, common_1.Post)('log'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_routine_log_model_1.UserRoutineLog]),
    __metadata("design:returntype", Promise)
], UserRoutineLogController.prototype, "logRoutineProgress", null);
__decorate([
    (0, common_1.Post)('bulk-log/:userRoutineId'),
    __param(0, (0, common_1.Param)('userRoutineId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserRoutineLogController.prototype, "bulkCreateLogs", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('includeRelations')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], UserRoutineLogController.prototype, "getRoutineLog", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('userRoutineId')),
    __param(1, (0, common_1.Query)('authUserId')),
    __param(2, (0, common_1.Query)('includeRelations')),
    __param(3, (0, common_1.Query)('startDate')),
    __param(4, (0, common_1.Query)('endDate')),
    __param(5, (0, common_1.Query)('date')),
    __param(6, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Boolean, String, String, String, Number]),
    __metadata("design:returntype", Promise)
], UserRoutineLogController.prototype, "getRoutineLogs", null);
__decorate([
    (0, common_1.Get)('stats/:userRoutineId'),
    __param(0, (0, common_1.Param)('userRoutineId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserRoutineLogController.prototype, "getRoutineStats", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_routine_log_model_1.UserRoutineLog]),
    __metadata("design:returntype", Promise)
], UserRoutineLogController.prototype, "updateRoutineLog", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserRoutineLogController.prototype, "deleteRoutineLog", null);
exports.UserRoutineLogController = UserRoutineLogController = __decorate([
    (0, common_1.Controller)('user-routine-logs'),
    __metadata("design:paramtypes", [user_routine_log_service_1.UserRoutineLogService])
], UserRoutineLogController);
//# sourceMappingURL=user-routine-log.controller.js.map