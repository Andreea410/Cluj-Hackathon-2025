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
exports.UserRoutineService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("./base.service");
const user_routine_model_1 = require("../models/user-routine.model");
let UserRoutineService = class UserRoutineService extends base_service_1.BaseService {
    constructor(userRoutineRepository) {
        super(userRoutineRepository);
        this.userRoutineRepository = userRoutineRepository;
    }
    async assignRoutine(userRoutine) {
        const existing = await this.userRoutineRepository.findByUserAndTemplate(userRoutine.user_id, userRoutine.routine_template_id);
        if (existing) {
            throw new Error('User already has this routine template assigned');
        }
        userRoutine.assigned_at = new Date();
        return this.create(userRoutine);
    }
    async findByUserId(userId) {
        return this.userRoutineRepository.findByUserId(userId);
    }
    async findByRoutineTemplateId(routineTemplateId) {
        return this.userRoutineRepository.findByRoutineTemplateId(routineTemplateId);
    }
    async findByAuthUserId(authUserId) {
        return this.userRoutineRepository.findByAuthUserId(authUserId);
    }
    async findByUserAndTemplate(userId, routineTemplateId) {
        return this.userRoutineRepository.findByUserAndTemplate(userId, routineTemplateId);
    }
    async findWithRelations(id) {
        return this.userRoutineRepository.findWithRelations(id);
    }
    async findAllWithRelations() {
        return this.userRoutineRepository.findAllWithRelations();
    }
    async findAllByUserWithDetails(userId) {
        return this.userRoutineRepository.findAllByUserWithDetails(userId);
    }
    async findAllByTemplateWithDetails(routineTemplateId) {
        return this.userRoutineRepository.findAllByTemplateWithDetails(routineTemplateId);
    }
    async findAllAssignedBetweenDates(startDate, endDate) {
        return this.userRoutineRepository.findAllAssignedBetweenDates(startDate, endDate);
    }
    async getRoutineStatistics(routineTemplateId) {
        const assignments = await this.findByRoutineTemplateId(routineTemplateId);
        const totalAssignments = assignments.length;
        const assignmentsByDate = assignments.reduce((acc, assignment) => {
            const date = assignment.assigned_at.toISOString().split('T')[0];
            const existingEntry = acc.find(entry => entry.date === date);
            if (existingEntry) {
                existingEntry.count++;
            }
            else {
                acc.push({ date, count: 1 });
            }
            return acc;
        }, []);
        assignmentsByDate.sort((a, b) => a.date.localeCompare(b.date));
        return {
            totalAssignments,
            assignmentsByDate
        };
    }
    async bulkAssignRoutines(userId, routineTemplateIds) {
        const results = [];
        for (const templateId of routineTemplateIds) {
            try {
                const userRoutine = await this.assignRoutine(new user_routine_model_1.UserRoutine({
                    user_id: userId,
                    routine_template_id: templateId,
                    assigned_at: new Date()
                }));
                results.push(userRoutine);
            }
            catch (error) {
                if (!error.message.includes('already has this routine')) {
                    throw error;
                }
            }
        }
        return results;
    }
    async hasUserAssignedRoutine(userId, routineTemplateId) {
        const assigned = await this.findByUserAndTemplate(userId, routineTemplateId);
        return !!assigned;
    }
    async getActiveRoutines(userId) {
        return this.userRoutineRepository.findActiveRoutines(userId);
    }
    async reassignRoutine(id, userRoutine) {
        const existing = await this.findById(id);
        if (!existing) {
            throw new Error('User routine not found');
        }
        if ((userRoutine.user_id !== existing.user_id ||
            userRoutine.routine_template_id !== existing.routine_template_id) &&
            await this.findByUserAndTemplate(userRoutine.user_id, userRoutine.routine_template_id)) {
            throw new Error('User already has this routine template assigned');
        }
        if (userRoutine.routine_template_id !== existing.routine_template_id) {
            userRoutine.assigned_at = new Date();
        }
        return this.update(id, userRoutine);
    }
};
exports.UserRoutineService = UserRoutineService;
exports.UserRoutineService = UserRoutineService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], UserRoutineService);
//# sourceMappingURL=user-routine.service.js.map