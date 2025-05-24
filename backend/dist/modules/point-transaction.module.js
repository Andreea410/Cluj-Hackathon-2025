"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointTransactionModule = void 0;
const common_1 = require("@nestjs/common");
const point_transaction_service_1 = require("../services/point-transaction.service");
const point_transaction_controller_1 = require("../controllers/point-transaction.controller");
const point_transaction_repository_1 = require("../repositories/point-transaction.repository");
const supabase_js_1 = require("@supabase/supabase-js");
let PointTransactionModule = class PointTransactionModule {
};
exports.PointTransactionModule = PointTransactionModule;
exports.PointTransactionModule = PointTransactionModule = __decorate([
    (0, common_1.Module)({
        controllers: [point_transaction_controller_1.PointTransactionController],
        providers: [
            point_transaction_service_1.PointTransactionService,
            {
                provide: supabase_js_1.SupabaseClient,
                useFactory: () => {
                    return new supabase_js_1.SupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
                },
            },
            point_transaction_repository_1.PointTransactionRepository,
        ],
        exports: [point_transaction_service_1.PointTransactionService],
    })
], PointTransactionModule);
//# sourceMappingURL=point-transaction.module.js.map