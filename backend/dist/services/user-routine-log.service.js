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
exports.UserRoutineLogService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("./base.service");
const user_routine_log_model_1 = require("../models/user-routine-log.model");
let UserRoutineLogService = class UserRoutineLogService extends base_service_1.BaseService {
    constructor(userRoutineLogRepository) {
        super(userRoutineLogRepository);
        this.userRoutineLogRepository = userRoutineLogRepository;
    }
    async logRoutineProgress(userRoutineLog) {
        const existing = await this.userRoutineLogRepository.findByUserRoutineAndDate(userRoutineLog.user_routine_id, userRoutineLog.log_date);
        if (existing) {
            throw new Error('Log already exists for this date');
        }
        if (userRoutineLog.completed_steps < 0) {
            throw new Error('Completed steps cannot be negative');
        }
        return this.create(userRoutineLog);
    }
    async findByUserRoutineId(userRoutineId) {
        return this.userRoutineLogRepository.findByUserRoutineId(userRoutineId);
    }
    async findByAuthUserId(authUserId) {
        return this.userRoutineLogRepository.findByAuthUserId(authUserId);
    }
    async findByUserRoutineAndDate(userRoutineId, logDate) {
        return this.userRoutineLogRepository.findByUserRoutineAndDate(userRoutineId, logDate);
    }
    async findWithRelations(id) {
        return this.userRoutineLogRepository.findWithRelations(id);
    }
    async findAllWithRelations() {
        return this.userRoutineLogRepository.findAllWithRelations();
    }
    async findAllByUserRoutineWithDetails(userRoutineId) {
        return this.userRoutineLogRepository.findAllByUserRoutineWithDetails(userRoutineId);
    }
    async findAllBetweenDates(startDate, endDate) {
        return this.userRoutineLogRepository.findAllBetweenDates(startDate, endDate);
    }
    async findAllByUserRoutineBetweenDates(userRoutineId, startDate, endDate) {
        return this.userRoutineLogRepository.findAllByUserRoutineBetweenDates(userRoutineId, startDate, endDate);
    }
    async getCompletionStats(userRoutineId) {
        const stats = await this.userRoutineLogRepository.getCompletionStats(userRoutineId);
        const logs = await this.findByUserRoutineId(userRoutineId);
        let currentStreak = 0;
        let longestStreak = 0;
        let lastLogDate = null;
        if (logs.length > 0) {
            logs.sort((a, b) => b.log_date.getTime() - a.log_date.getTime());
            lastLogDate = logs[0].log_date;
            let streak = 0;
            let prevDate = null;
            for (const log of logs) {
                if (!prevDate) {
                    streak = 1;
                }
                else {
                    const diffDays = Math.floor((prevDate.getTime() - log.log_date.getTime()) / (1000 * 60 * 60 * 24));
                    if (diffDays === 1) {
                        streak++;
                    }
                    else {
                        longestStreak = Math.max(longestStreak, streak);
                        streak = 1;
                    }
                }
                prevDate = log.log_date;
            }
            longestStreak = Math.max(longestStreak, streak);
            const today = new Date();
            const diffDays = Math.floor((today.getTime() - lastLogDate.getTime()) / (1000 * 60 * 60 * 24));
            currentStreak = diffDays <= 1 ? streak : 0;
        }
        return {
            ...stats,
            streakData: {
                currentStreak,
                longestStreak,
                lastLogDate
            }
        };
    }
    async findRecentLogs(limit) {
        return this.userRoutineLogRepository.findRecentLogs(limit);
    }
    async findByDate(logDate) {
        return this.userRoutineLogRepository.findByDate(logDate);
    }
    async updateRoutineLog(id, userRoutineLog) {
        const existing = await this.findById(id);
        if (!existing) {
            throw new Error('User routine log not found');
        }
        if (userRoutineLog.log_date.getTime() !== existing.log_date.getTime() &&
            await this.findByUserRoutineAndDate(userRoutineLog.user_routine_id, userRoutineLog.log_date)) {
            throw new Error('Log already exists for this date');
        }
        if (userRoutineLog.completed_steps < 0) {
            throw new Error('Completed steps cannot be negative');
        }
        return this.update(id, userRoutineLog);
    }
    async bulkCreateLogs(userRoutineId, logs) {
        const results = [];
        for (const log of logs) {
            try {
                const userRoutineLog = await this.logRoutineProgress(new user_routine_log_model_1.UserRoutineLog({
                    user_routine_id: userRoutineId,
                    log_date: log.logDate,
                    completed_steps: log.completedSteps
                }));
                results.push(userRoutineLog);
            }
            catch (error) {
                if (!error.message.includes('already exists')) {
                    throw error;
                }
            }
        }
        return results;
    }
};
exports.UserRoutineLogService = UserRoutineLogService;
exports.UserRoutineLogService = UserRoutineLogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], UserRoutineLogService);
//# sourceMappingURL=user-routine-log.service.js.map