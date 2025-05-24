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
exports.SideEffectService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("./base.service");
let SideEffectService = class SideEffectService extends base_service_1.BaseService {
    constructor(sideEffectRepository) {
        super(sideEffectRepository);
        this.sideEffectRepository = sideEffectRepository;
    }
    async createSideEffect(sideEffect) {
        if (!sideEffect.name) {
            throw new Error('Side effect name is required');
        }
        const existingSideEffect = await this.sideEffectRepository.findByName(sideEffect.name);
        if (existingSideEffect) {
            throw new Error('A side effect with this name already exists');
        }
        return this.create(sideEffect);
    }
    async updateSideEffect(id, sideEffect) {
        if (sideEffect.name) {
            const existingSideEffect = await this.sideEffectRepository.findByName(sideEffect.name);
            if (existingSideEffect && existingSideEffect.id !== id) {
                throw new Error('A side effect with this name already exists');
            }
        }
        return this.update(id, sideEffect);
    }
    async searchSideEffects(query) {
        if (!query) {
            return this.findAll();
        }
        return this.sideEffectRepository.findByNameOrDescription(query);
    }
    async findByName(name) {
        return this.sideEffectRepository.findByName(name);
    }
    async searchByName(query) {
        return this.sideEffectRepository.searchByName(query);
    }
};
exports.SideEffectService = SideEffectService;
exports.SideEffectService = SideEffectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], SideEffectService);
//# sourceMappingURL=side-effect.service.js.map