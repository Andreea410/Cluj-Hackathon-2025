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
exports.PhotoUploadController = void 0;
const common_1 = require("@nestjs/common");
const photo_upload_service_1 = require("../services/photo-upload.service");
const photo_upload_model_1 = require("../models/photo-upload.model");
let PhotoUploadController = class PhotoUploadController {
    constructor(photoUploadService) {
        this.photoUploadService = photoUploadService;
    }
    async createPhotoUpload(photoUpload) {
        try {
            return await this.photoUploadService.createPhotoUpload(photoUpload);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getPhotoUpload(id, includeUser) {
        try {
            if (includeUser) {
                const photoUpload = await this.photoUploadService.findWithUser(id);
                if (!photoUpload)
                    throw new Error('Photo upload not found');
                return photoUpload;
            }
            return await this.photoUploadService.findById(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getAllPhotoUploads(userId, authUserId, startDate, endDate, includeUsers) {
        try {
            if (userId) {
                return await this.photoUploadService.findByUserId(userId);
            }
            if (authUserId) {
                return await this.photoUploadService.findByAuthUserId(authUserId);
            }
            if (startDate && endDate) {
                return await this.photoUploadService.findByDateRange(new Date(startDate), new Date(endDate));
            }
            if (includeUsers) {
                return await this.photoUploadService.findAllWithUsers();
            }
            return await this.photoUploadService.findAll();
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updatePhotoUpload(id, photoUpload) {
        try {
            return await this.photoUploadService.updatePhotoUpload(id, photoUpload);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deletePhotoUpload(id) {
        try {
            await this.photoUploadService.delete(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.PhotoUploadController = PhotoUploadController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [photo_upload_model_1.PhotoUpload]),
    __metadata("design:returntype", Promise)
], PhotoUploadController.prototype, "createPhotoUpload", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('includeUser')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], PhotoUploadController.prototype, "getPhotoUpload", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Query)('authUserId')),
    __param(2, (0, common_1.Query)('startDate')),
    __param(3, (0, common_1.Query)('endDate')),
    __param(4, (0, common_1.Query)('includeUsers')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Boolean]),
    __metadata("design:returntype", Promise)
], PhotoUploadController.prototype, "getAllPhotoUploads", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PhotoUploadController.prototype, "updatePhotoUpload", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PhotoUploadController.prototype, "deletePhotoUpload", null);
exports.PhotoUploadController = PhotoUploadController = __decorate([
    (0, common_1.Controller)('photo-uploads'),
    __metadata("design:paramtypes", [photo_upload_service_1.PhotoUploadService])
], PhotoUploadController);
//# sourceMappingURL=photo-upload.controller.js.map