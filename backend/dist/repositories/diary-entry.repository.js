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
exports.DiaryEntryRepository = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const base_supabase_repository_1 = require("./base.supabase.repository");
const diary_entry_model_1 = require("../models/diary-entry.model");
const database_error_1 = require("../shared/exceptions/database.error");
let DiaryEntryRepository = class DiaryEntryRepository extends base_supabase_repository_1.BaseSupabaseRepository {
    constructor(supabase) {
        super(supabase, 'diary_entries', diary_entry_model_1.DiaryEntry);
    }
    async findByUserId(userId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('user_id', userId)
            .order('date', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => diary_entry_model_1.DiaryEntry.fromJSON(item));
    }
    async findByDateRange(userId, startDate, endDate) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('user_id', userId)
            .gte('date', startDate.toISOString().split('T')[0])
            .lte('date', endDate.toISOString().split('T')[0])
            .order('date', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => diary_entry_model_1.DiaryEntry.fromJSON(item));
    }
    async findByDate(userId, date) {
        const dateString = date.toISOString().split('T')[0];
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('user_id', userId)
            .eq('date', dateString)
            .order('created_at', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => diary_entry_model_1.DiaryEntry.fromJSON(item));
    }
    async findLatestEntries(userId, limit) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('user_id', userId)
            .order('date', { ascending: false })
            .limit(limit);
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => diary_entry_model_1.DiaryEntry.fromJSON(item));
    }
};
exports.DiaryEntryRepository = DiaryEntryRepository;
exports.DiaryEntryRepository = DiaryEntryRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], DiaryEntryRepository);
//# sourceMappingURL=diary-entry.repository.js.map