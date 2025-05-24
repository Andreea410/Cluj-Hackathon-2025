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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutineController = void 0;
const common_1 = require("@nestjs/common");
const user_routine_service_1 = require("../services/user-routine.service");
const user_routine_model_1 = require("../models/user-routine.model");
let UserRoutineController = class UserRoutineController {
    constructor(userRoutineService) {
        this.userRoutineService = userRoutineService;
    }
    async assignRoutine(userRoutine) {
        try {
            return await this.userRoutineService.assignRoutine(userRoutine);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async bulkAssignRoutines(userId, data) {
        try {
            return await this.userRoutineService.bulkAssignRoutines(userId, data.routineTemplateIds);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getUserRoutine(id, includeRelations) {
        try {
            if (includeRelations) {
                const routine = await this.userRoutineService.findWithRelations(id);
                if (!routine)
                    throw new Error('User routine not found');
                return routine;
            }
            const routine = await this.userRoutineService.findById(id);
            if (!routine)
                throw new Error('User routine not found');
            return routine;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getAllUserRoutines(userId, routineTemplateId, authUserId, includeRelations, startDate, endDate) {
        try {
            if (startDate && endDate) {
                return await this.userRoutineService.findAllAssignedBetweenDates(new Date(startDate), new Date(endDate));
            }
            if (userId && routineTemplateId) {
                const routine = await this.userRoutineService.findByUserAndTemplate(userId, routineTemplateId);
                return routine ? [routine] : [];
            }
            if (userId) {
                return await this.userRoutineService.findAllByUserWithDetails(userId);
            }
            if (routineTemplateId) {
                return await this.userRoutineService.findAllByTemplateWithDetails(routineTemplateId);
            }
            if (authUserId) {
                return await this.userRoutineService.findByAuthUserId(authUserId);
            }
            if (includeRelations) {
                return await this.userRoutineService.findAllWithRelations();
            }
            return await this.userRoutineService.findAll();
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getRoutineStatistics(routineTemplateId) {
        try {
            return await this.userRoutineService.getRoutineStatistics(routineTemplateId);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async checkRoutineAssigned(userId, routineTemplateId) {
        try {
            const assigned = await this.userRoutineService.hasUserAssignedRoutine(userId, routineTemplateId);
            return { assigned };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getActiveRoutines(userId) {
        try {
            return await this.userRoutineService.getActiveRoutines(userId);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async reassignRoutine(id, userRoutine) {
        try {
            return await this.userRoutineService.reassignRoutine(id, userRoutine);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteUserRoutine(id) {
        try {
            await this.userRoutineService.delete(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.UserRoutineController = UserRoutineController;
__decorate([
    (0, common_1.Post)('assign'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof user_routine_model_1.UserRoutine !== "undefined" && user_routine_model_1.UserRoutine) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], UserRoutineController.prototype, "assignRoutine", null);
__decorate([
    (0, common_1.Post)('bulk-assign/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserRoutineController.prototype, "bulkAssignRoutines", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('includeRelations')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], UserRoutineController.prototype, "getUserRoutine", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Query)('routineTemplateId')),
    __param(2, (0, common_1.Query)('authUserId')),
    __param(3, (0, common_1.Query)('includeRelations')),
    __param(4, (0, common_1.Query)('startDate')),
    __param(5, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Boolean, String, String]),
    __metadata("design:returntype", Promise)
], UserRoutineController.prototype, "getAllUserRoutines", null);
__decorate([
    (0, common_1.Get)('statistics/template/:routineTemplateId'),
    __param(0, (0, common_1.Param)('routineTemplateId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserRoutineController.prototype, "getRoutineStatistics", null);
__decorate([
    (0, common_1.Get)('check/:userId/:routineTemplateId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('routineTemplateId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserRoutineController.prototype, "checkRoutineAssigned", null);
__decorate([
    (0, common_1.Get)('active/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserRoutineController.prototype, "getActiveRoutines", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof user_routine_model_1.UserRoutine !== "undefined" && user_routine_model_1.UserRoutine) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], UserRoutineController.prototype, "reassignRoutine", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserRoutineController.prototype, "deleteUserRoutine", null);
exports.UserRoutineController = UserRoutineController = __decorate([
    (0, common_1.Controller)('user-routines'),
    __metadata("design:paramtypes", [user_routine_service_1.UserRoutineService])
], UserRoutineController);
//# sourceMappingURL=user-routine.controller.js.map