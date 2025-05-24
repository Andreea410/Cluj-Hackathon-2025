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
exports.BrandService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("./base.service");
let BrandService = class BrandService extends base_service_1.BaseService {
    constructor(brandRepository) {
        super(brandRepository);
        this.brandRepository = brandRepository;
    }
    async createBrand(brand) {
        const existingBrand = await this.brandRepository.findByName(brand.name);
        if (existingBrand) {
            throw new Error('A brand with this name already exists');
        }
        if (brand.website) {
            const existingWebsite = await this.brandRepository.findByWebsite(brand.website);
            if (existingWebsite) {
                throw new Error('A brand with this website already exists');
            }
        }
        return this.create(brand);
    }
    async updateBrand(id, brand) {
        if (brand.name) {
            const existingBrand = await this.brandRepository.findByName(brand.name);
            if (existingBrand && existingBrand.id !== id) {
                throw new Error('A brand with this name already exists');
            }
        }
        if (brand.website) {
            const existingWebsite = await this.brandRepository.findByWebsite(brand.website);
            if (existingWebsite && existingWebsite.id !== id) {
                throw new Error('A brand with this website already exists');
            }
        }
        return this.update(id, brand);
    }
};
exports.BrandService = BrandService;
exports.BrandService = BrandService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], BrandService);
//# sourceMappingURL=brand.service.js.map