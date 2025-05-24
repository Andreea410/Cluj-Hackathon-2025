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
exports.PhotoAnalysisRepository = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const base_supabase_repository_1 = require("./base.supabase.repository");
const photo_analysis_model_1 = require("../models/photo-analysis.model");
const database_error_1 = require("../shared/exceptions/database.error");
let PhotoAnalysisRepository = class PhotoAnalysisRepository extends base_supabase_repository_1.BaseSupabaseRepository {
    constructor(supabase) {
        super(supabase, 'photo_analyses', photo_analysis_model_1.PhotoAnalysis);
    }
    async findByPhotoUploadId(photoUploadId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('photo_upload_id', photoUploadId)
            .order('analyzed_at', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => photo_analysis_model_1.PhotoAnalysis.fromJSON(item));
    }
    async findByDateRange(startDate, endDate) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .gte('analyzed_at', startDate.toISOString())
            .lte('analyzed_at', endDate.toISOString())
            .order('analyzed_at', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => photo_analysis_model_1.PhotoAnalysis.fromJSON(item));
    }
    async findWithPhotoUpload(id) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        *,
        photo_upload:photo_upload_id (*)
      `)
            .eq('id', id)
            .single();
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data ? photo_analysis_model_1.PhotoAnalysis.fromJSON(data) : null;
    }
    async findAllWithPhotoUploads() {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        *,
        photo_upload:photo_upload_id (*)
      `)
            .order('analyzed_at', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => photo_analysis_model_1.PhotoAnalysis.fromJSON(item));
    }
};
exports.PhotoAnalysisRepository = PhotoAnalysisRepository;
exports.PhotoAnalysisRepository = PhotoAnalysisRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], PhotoAnalysisRepository);
//# sourceMappingURL=photo-analysis.repository.js.map