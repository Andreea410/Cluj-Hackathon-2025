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
exports.PhotoAnalysisService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("./base.service");
let PhotoAnalysisService = class PhotoAnalysisService extends base_service_1.BaseService {
    constructor(photoAnalysisRepository) {
        super(photoAnalysisRepository);
        this.photoAnalysisRepository = photoAnalysisRepository;
    }
    async createPhotoAnalysis(photoAnalysis) {
        if (!photoAnalysis.analyzed_at) {
            photoAnalysis.analyzed_at = new Date();
        }
        return this.create(photoAnalysis);
    }
    async findByPhotoUploadId(photoUploadId) {
        return this.photoAnalysisRepository.findByPhotoUploadId(photoUploadId);
    }
    async findByDateRange(startDate, endDate) {
        return this.photoAnalysisRepository.findByDateRange(startDate, endDate);
    }
    async findWithPhotoUpload(id) {
        return this.photoAnalysisRepository.findWithPhotoUpload(id);
    }
    async findAllWithPhotoUploads() {
        return this.photoAnalysisRepository.findAllWithPhotoUploads();
    }
    async updatePhotoAnalysis(id, photoAnalysis) {
        const { photo_upload_id, ...updateData } = photoAnalysis;
        return this.update(id, updateData);
    }
    async analyzeMetrics(metrics) {
        return metrics;
    }
};
exports.PhotoAnalysisService = PhotoAnalysisService;
exports.PhotoAnalysisService = PhotoAnalysisService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], PhotoAnalysisService);
//# sourceMappingURL=photo-analysis.service.js.map