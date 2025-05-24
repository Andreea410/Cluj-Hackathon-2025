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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("./base.service");
const user_model_1 = require("../models/user.model");
const user_repository_1 = require("../repositories/user.repository");
const bcrypt = require("bcrypt");
let UserService = class UserService extends base_service_1.BaseService {
    constructor(userRepository) {
        super(userRepository);
        this.userRepository = userRepository;
    }
    async createUser(userData) {
        const existingUser = await this.userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new Error('A user with this email already exists');
        }
        const salt = await bcrypt.genSalt();
        const hashed_password = await bcrypt.hash(userData.password, salt);
        const user = new user_model_1.User({
            ...userData,
            hashed_password,
            created_at: new Date(),
            role_id: userData.role_id || 'user'
        });
        return this.create(user);
    }
    async updateUser(id, user) {
        if (user.email) {
            const existingUser = await this.userRepository.findByEmail(user.email);
            if (existingUser && existingUser.id !== id) {
                throw new Error('A user with this email already exists');
            }
        }
        if (user.hashed_password) {
            const salt = await bcrypt.genSalt();
            user.hashed_password = await bcrypt.hash(user.hashed_password, salt);
        }
        return this.update(id, user);
    }
    async findByEmail(email) {
        return this.userRepository.findByEmail(email);
    }
    async findByRoleId(roleId) {
        return this.userRepository.findByRoleId(roleId);
    }
    async findWithRole(id) {
        return this.userRepository.findWithRole(id);
    }
    async findAllWithRoles() {
        return this.userRepository.findAllWithRoles();
    }
    async validatePassword(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (!user)
            return null;
        const isValid = await bcrypt.compare(password, user.hashed_password);
        return isValid ? user : null;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserService);
//# sourceMappingURL=user.service.js.map