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
exports.PhotoAnalysisController = void 0;
const common_1 = require("@nestjs/common");
const photo_analysis_service_1 = require("../services/photo-analysis.service");
const photo_analysis_model_1 = require("../models/photo-analysis.model");
let PhotoAnalysisController = class PhotoAnalysisController {
    constructor(photoAnalysisService) {
        this.photoAnalysisService = photoAnalysisService;
    }
    async createPhotoAnalysis(photoAnalysis) {
        try {
            photoAnalysis.metrics = await this.photoAnalysisService.analyzeMetrics(photoAnalysis.metrics);
            return await this.photoAnalysisService.createPhotoAnalysis(photoAnalysis);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getPhotoAnalysis(id, includePhotoUpload) {
        try {
            if (includePhotoUpload) {
                const analysis = await this.photoAnalysisService.findWithPhotoUpload(id);
                if (!analysis)
                    throw new Error('Photo analysis not found');
                return analysis;
            }
            return await this.photoAnalysisService.findById(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getAllPhotoAnalyses(photoUploadId, startDate, endDate, includePhotoUploads) {
        try {
            if (photoUploadId) {
                return await this.photoAnalysisService.findByPhotoUploadId(photoUploadId);
            }
            if (startDate && endDate) {
                return await this.photoAnalysisService.findByDateRange(new Date(startDate), new Date(endDate));
            }
            if (includePhotoUploads) {
                return await this.photoAnalysisService.findAllWithPhotoUploads();
            }
            return await this.photoAnalysisService.findAll();
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updatePhotoAnalysis(id, photoAnalysis) {
        try {
            if (photoAnalysis.metrics) {
                photoAnalysis.metrics = await this.photoAnalysisService.analyzeMetrics(photoAnalysis.metrics);
            }
            return await this.photoAnalysisService.updatePhotoAnalysis(id, photoAnalysis);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deletePhotoAnalysis(id) {
        try {
            await this.photoAnalysisService.delete(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.PhotoAnalysisController = PhotoAnalysisController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [photo_analysis_model_1.PhotoAnalysis]),
    __metadata("design:returntype", Promise)
], PhotoAnalysisController.prototype, "createPhotoAnalysis", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('includePhotoUpload')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], PhotoAnalysisController.prototype, "getPhotoAnalysis", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('photoUploadId')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __param(3, (0, common_1.Query)('includePhotoUploads')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Boolean]),
    __metadata("design:returntype", Promise)
], PhotoAnalysisController.prototype, "getAllPhotoAnalyses", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PhotoAnalysisController.prototype, "updatePhotoAnalysis", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PhotoAnalysisController.prototype, "deletePhotoAnalysis", null);
exports.PhotoAnalysisController = PhotoAnalysisController = __decorate([
    (0, common_1.Controller)('photo-analyses'),
    __metadata("design:paramtypes", [photo_analysis_service_1.PhotoAnalysisService])
], PhotoAnalysisController);
//# sourceMappingURL=photo-analysis.controller.js.map