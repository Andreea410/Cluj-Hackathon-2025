"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
class BaseService {
    constructor(repository) {
        this.repository = repository;
    }
    async create(entity) {
        return this.repository.create(entity);
    }
    async findById(id) {
        const entity = await this.repository.findById(id);
        if (!entity) {
            throw new Error('Entity not found');
        }
        return entity;
    }
    async findAll() {
        return this.repository.findAll();
    }
    async update(id, entity) {
        const existingEntity = await this.repository.findById(id);
        if (!existingEntity) {
            throw new Error('Entity not found');
        }
        return this.repository.update(id, entity);
    }
    async delete(id) {
        const existingEntity = await this.repository.findById(id);
        if (!existingEntity) {
            throw new Error('Entity not found');
        }
        await this.repository.delete(id);
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map