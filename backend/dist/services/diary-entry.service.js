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
exports.DiaryEntryService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("./base.service");
let DiaryEntryService = class DiaryEntryService extends base_service_1.BaseService {
    constructor(diaryEntryRepository) {
        super(diaryEntryRepository);
        this.diaryEntryRepository = diaryEntryRepository;
    }
    async createDiaryEntry(entry) {
        if (!entry.user_id) {
            throw new Error('User ID is required');
        }
        if (!entry.date) {
            entry.date = new Date();
        }
        entry.created_at = new Date();
        return this.create(entry);
    }
    async getUserEntries(userId) {
        return this.diaryEntryRepository.findByUserId(userId);
    }
    async getEntriesByDateRange(userId, startDate, endDate) {
        if (startDate > endDate) {
            throw new Error('Start date cannot be after end date');
        }
        return this.diaryEntryRepository.findByDateRange(userId, startDate, endDate);
    }
    async getEntriesByDate(userId, date) {
        return this.diaryEntryRepository.findByDate(userId, date);
    }
    async getLatestEntries(userId, limit = 10) {
        if (limit < 1) {
            throw new Error('Limit must be greater than 0');
        }
        return this.diaryEntryRepository.findLatestEntries(userId, limit);
    }
    async updateDiaryEntry(id, entry) {
        const existingEntry = await this.findById(id);
        if (entry.user_id && entry.user_id !== existingEntry.user_id) {
            throw new Error('Cannot change the user ID of a diary entry');
        }
        return this.update(id, entry);
    }
    async deleteDiaryEntry(id, userId) {
        const entry = await this.findById(id);
        if (entry.user_id !== userId) {
            throw new Error('You can only delete your own diary entries');
        }
        await this.delete(id);
    }
};
exports.DiaryEntryService = DiaryEntryService;
exports.DiaryEntryService = DiaryEntryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], DiaryEntryService);
//# sourceMappingURL=diary-entry.service.js.map