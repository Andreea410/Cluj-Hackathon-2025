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
exports.PaymentRepository = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const base_supabase_repository_1 = require("./base.supabase.repository");
const payment_model_1 = require("../models/payment.model");
const database_error_1 = require("../shared/exceptions/database.error");
let PaymentRepository = class PaymentRepository extends base_supabase_repository_1.BaseSupabaseRepository {
    constructor(supabase) {
        super(supabase, 'payments', payment_model_1.Payment);
    }
    async findByOrderId(orderId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('order_id', orderId);
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => payment_model_1.Payment.fromJSON(item));
    }
    async findByStripeChargeId(stripeChargeId) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('stripe_charge_id', stripeChargeId)
            .single();
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data ? payment_model_1.Payment.fromJSON(data) : null;
    }
    async findByDateRange(startDate, endDate) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .gte('paid_at', startDate.toISOString())
            .lte('paid_at', endDate.toISOString())
            .order('paid_at', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => payment_model_1.Payment.fromJSON(item));
    }
    async findWithOrder(id) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        *,
        order:order_id (*)
      `)
            .eq('id', id)
            .single();
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data ? payment_model_1.Payment.fromJSON(data) : null;
    }
    async findAllWithOrders() {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select(`
        *,
        order:order_id (*)
      `)
            .order('paid_at', { ascending: false });
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => payment_model_1.Payment.fromJSON(item));
    }
};
exports.PaymentRepository = PaymentRepository;
exports.PaymentRepository = PaymentRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], PaymentRepository);
//# sourceMappingURL=payment.repository.js.map