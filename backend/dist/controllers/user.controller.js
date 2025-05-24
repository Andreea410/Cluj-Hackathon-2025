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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../services/user.service");
const supabase_js_1 = require("@supabase/supabase-js");
let UserController = class UserController {
    constructor(userService, supabase) {
        this.userService = userService;
        this.supabase = supabase;
        console.log('UserController initialized');
    }
    ping() {
        console.log('Ping route hit!');
        return { message: 'pong' };
    }
    testRoute() {
        console.log('Test route hit!');
        return { message: 'Test route hit!' };
    }
    async getMorningRoutineProducts(userId, request) {
        console.log('=== [START] getMorningRoutineProducts ===');
        console.log('[STEP 1] Received request for user ID:', userId);
        console.log('[STEP 2] Timestamp:', new Date().toISOString());
        try {
            console.log('[STEP 3] Checking if user exists...');
            const { data: user, error: userError } = await this.supabase
                .from('users')
                .select('id, email')
                .eq('id', userId)
                .single();
            console.log('[STEP 3.1] User query result:', { user, userError });
            if (userError) {
                console.error('[ERROR] User not found:', userError);
                throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
            }
            if (!user) {
                console.log('[STEP 3.2] User not found in database');
                throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
            }
            console.log('[STEP 4] Checking user_routines for user...');
            const { data: userRoutines, error: userRoutinesError } = await this.supabase
                .from('user_routines')
                .select('id, user_id, routine_template_id')
                .eq('user_id', userId);
            console.log('[STEP 4.1] user_routines query result:', { userRoutines, userRoutinesError });
            if (userRoutinesError) {
                console.error('[ERROR] Error checking user_routines:', userRoutinesError);
                throw new common_1.HttpException('Failed to check user routines', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            if (!userRoutines || userRoutines.length === 0) {
                console.log('[STEP 4.2] No routines found in user_routines table for user:', userId);
                throw new common_1.HttpException('Please complete your profile in order to get a routine', common_1.HttpStatus.NOT_FOUND);
            }
            console.log('[STEP 5] Getting user routine template details...');
            const { data: userRoutine, error: userRoutineError } = await this.supabase
                .from('user_routines')
                .select('id, routine_template_id, routine_templates (id, name, description)')
                .eq('user_id', userId)
                .single();
            console.log('[STEP 5.1] userRoutine query result:', { userRoutine, userRoutineError });
            if (userRoutineError) {
                console.error('[ERROR] Error fetching user routine:', userRoutineError);
                throw new common_1.HttpException('Failed to fetch user routine', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            if (!userRoutine) {
                console.log('[STEP 5.2] No routine found for user:', userId);
                throw new common_1.HttpException('Please complete your profile in order to get a routine', common_1.HttpStatus.NOT_FOUND);
            }
            console.log('[STEP 6] Getting products for template:', userRoutine.routine_template_id);
            const { data: products, error: productsError } = await this.supabase
                .from('routine_template_products')
                .select('id, routine_template_id, product_id, products (id, name, photo_url)')
                .eq('routine_template_id', userRoutine.routine_template_id);
            console.log('[STEP 6.1] Raw products response:', products);
            if (productsError) {
                console.error('[ERROR] Error fetching products:', productsError);
                throw new common_1.HttpException('Failed to fetch products', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            if (!products || products.length === 0) {
                console.log('[STEP 6.2] No products found for routine template:', userRoutine.routine_template_id);
                throw new common_1.HttpException('Please complete your profile in order to get a routine', common_1.HttpStatus.NOT_FOUND);
            }
            console.log('[STEP 7] Formatting products...');
            const formattedProducts = products
                .map(item => Array.isArray(item.products) ? item.products[0] : item.products)
                .filter(Boolean);
            console.log('[STEP 7.1] Formatted products:', formattedProducts);
            console.log('=== [END] getMorningRoutineProducts ===');
            return formattedProducts;
        }
        catch (err) {
            console.error('[ERROR] in getMorningRoutineProducts:', err);
            if (err instanceof common_1.HttpException)
                throw err;
            throw new common_1.HttpException('Please complete your profile in order to get a routine', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getUser(id, includeRole) {
        try {
            if (includeRole) {
                const user = await this.userService.findWithRole(id);
                if (!user)
                    throw new Error('User not found');
                return user;
            }
            return await this.userService.findById(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getAllUsers(roleId, includeRoles) {
        try {
            if (roleId) {
                return await this.userService.findByRoleId(roleId);
            }
            if (includeRoles) {
                return await this.userService.findAllWithRoles();
            }
            return await this.userService.findAll();
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateUser(id, user) {
        try {
            return await this.userService.updateUser(id, user);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteUser(id) {
        try {
            await this.userService.delete(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async validateUser(email, password) {
        try {
            const user = await this.userService.validatePassword(email, password);
            if (!user) {
                throw new Error('Invalid email or password');
            }
            return user;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('ping'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "ping", null);
__decorate([
    (0, common_1.Get)('test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "testRoute", null);
__decorate([
    (0, common_1.Get)(':id/morning-products'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMorningRoutineProducts", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('includeRole')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('roleId')),
    __param(1, (0, common_1.Query)('includeRoles')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Post)('validate'),
    __param(0, (0, common_1.Body)('email')),
    __param(1, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "validateUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __param(1, (0, common_1.Inject)(supabase_js_1.SupabaseClient)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        supabase_js_1.SupabaseClient])
], UserController);
//# sourceMappingURL=user.controller.js.map