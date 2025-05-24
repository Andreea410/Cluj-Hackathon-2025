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
exports.DiaryEntryController = void 0;
const common_1 = require("@nestjs/common");
const diary_entry_service_1 = require("../services/diary-entry.service");
const diary_entry_model_1 = require("../models/diary-entry.model");
let DiaryEntryController = class DiaryEntryController {
    constructor(diaryEntryService) {
        this.diaryEntryService = diaryEntryService;
    }
    async createEntry(entry) {
        try {
            return await this.diaryEntryService.createDiaryEntry(entry);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getUserEntries(userId, startDate, endDate, date, limit) {
        try {
            if (startDate && endDate) {
                return await this.diaryEntryService.getEntriesByDateRange(userId, new Date(startDate), new Date(endDate));
            }
            if (date) {
                return await this.diaryEntryService.getEntriesByDate(userId, new Date(date));
            }
            if (limit) {
                return await this.diaryEntryService.getLatestEntries(userId, limit);
            }
            return await this.diaryEntryService.getUserEntries(userId);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getEntry(id) {
        try {
            return await this.diaryEntryService.findById(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async updateEntry(id, entry) {
        try {
            return await this.diaryEntryService.updateDiaryEntry(id, entry);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteEntry(id, userId) {
        try {
            await this.diaryEntryService.deleteDiaryEntry(id, userId);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.DiaryEntryController = DiaryEntryController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [diary_entry_model_1.DiaryEntry]),
    __metadata("design:returntype", Promise)
], DiaryEntryController.prototype, "createEntry", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __param(3, (0, common_1.Query)('date')),
    __param(4, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Number]),
    __metadata("design:returntype", Promise)
], DiaryEntryController.prototype, "getUserEntries", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DiaryEntryController.prototype, "getEntry", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DiaryEntryController.prototype, "updateEntry", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DiaryEntryController.prototype, "deleteEntry", null);
exports.DiaryEntryController = DiaryEntryController = __decorate([
    (0, common_1.Controller)('diary-entries'),
    __metadata("design:paramtypes", [diary_entry_service_1.DiaryEntryService])
], DiaryEntryController);
//# sourceMappingURL=diary-entry.controller.js.map