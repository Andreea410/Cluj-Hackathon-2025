"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SideEffectModule = void 0;
const common_1 = require("@nestjs/common");
const side_effect_controller_1 = require("../controllers/side-effect.controller");
const side_effect_service_1 = require("../services/side-effect.service");
const side_effect_repository_1 = require("../repositories/side-effect.repository");
let SideEffectModule = class SideEffectModule {
};
exports.SideEffectModule = SideEffectModule;
exports.SideEffectModule = SideEffectModule = __decorate([
    (0, common_1.Module)({
        controllers: [side_effect_controller_1.SideEffectController],
        providers: [side_effect_service_1.SideEffectService, side_effect_repository_1.SideEffectRepository],
        exports: [side_effect_service_1.SideEffectService]
    })
], SideEffectModule);
//# sourceMappingURL=side-effect.module.js.map