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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("./base.service");
let RoleService = class RoleService extends base_service_1.BaseService {
    constructor(roleRepository) {
        super(roleRepository);
        this.roleRepository = roleRepository;
    }
    async createRole(role) {
        const existingRole = await this.roleRepository.findByName(role.name);
        if (existingRole) {
            throw new Error('A role with this name already exists');
        }
        return this.create(role);
    }
    async updateRole(id, role) {
        if (role.name) {
            const existingRole = await this.roleRepository.findByName(role.name);
            if (existingRole && existingRole.id !== id) {
                throw new Error('A role with this name already exists');
            }
        }
        return this.update(id, role);
    }
    async findByPermission(permission) {
        return this.roleRepository.findByPermission(permission);
    }
    async addPermission(id, permission) {
        const role = await this.findById(id);
        if (!role.permissions.includes(permission)) {
            role.permissions.push(permission);
            return this.update(id, { permissions: role.permissions });
        }
        return role;
    }
    async removePermission(id, permission) {
        const role = await this.findById(id);
        role.permissions = role.permissions.filter(p => p !== permission);
        return this.update(id, { permissions: role.permissions });
    }
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], RoleService);
//# sourceMappingURL=role.service.js.map