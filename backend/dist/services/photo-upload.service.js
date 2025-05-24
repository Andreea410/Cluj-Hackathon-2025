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
exports.PhotoUploadService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("./base.service");
let PhotoUploadService = class PhotoUploadService extends base_service_1.BaseService {
    constructor(photoUploadRepository) {
        super(photoUploadRepository);
        this.photoUploadRepository = photoUploadRepository;
    }
    async createPhotoUpload(photoUpload) {
        if (!photoUpload.upload_date) {
            photoUpload.upload_date = new Date();
        }
        if (!photoUpload.created_at) {
            photoUpload.created_at = new Date();
        }
        return this.create(photoUpload);
    }
    async findByUserId(userId) {
        return this.photoUploadRepository.findByUserId(userId);
    }
    async findByDateRange(startDate, endDate) {
        return this.photoUploadRepository.findByDateRange(startDate, endDate);
    }
    async findWithUser(id) {
        return this.photoUploadRepository.findWithUser(id);
    }
    async findAllWithUsers() {
        return this.photoUploadRepository.findAllWithUsers();
    }
    async findByAuthUserId(authUserId) {
        return this.photoUploadRepository.findByAuthUserId(authUserId);
    }
    async updatePhotoUpload(id, photoUpload) {
        const { user_id, auth_user_id, ...updateData } = photoUpload;
        return this.update(id, updateData);
    }
};
exports.PhotoUploadService = PhotoUploadService;
exports.PhotoUploadService = PhotoUploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], PhotoUploadService);
//# sourceMappingURL=photo-upload.service.js.map