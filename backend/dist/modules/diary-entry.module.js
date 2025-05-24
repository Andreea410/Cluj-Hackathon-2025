"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiaryEntryModule = void 0;
const common_1 = require("@nestjs/common");
const diary_entry_controller_1 = require("../controllers/diary-entry.controller");
const diary_entry_service_1 = require("../services/diary-entry.service");
const diary_entry_repository_1 = require("../repositories/diary-entry.repository");
let DiaryEntryModule = class DiaryEntryModule {
};
exports.DiaryEntryModule = DiaryEntryModule;
exports.DiaryEntryModule = DiaryEntryModule = __decorate([
    (0, common_1.Module)({
        controllers: [diary_entry_controller_1.DiaryEntryController],
        providers: [diary_entry_service_1.DiaryEntryService, diary_entry_repository_1.DiaryEntryRepository],
        exports: [diary_entry_service_1.DiaryEntryService]
    })
], DiaryEntryModule);
//# sourceMappingURL=diary-entry.module.js.map