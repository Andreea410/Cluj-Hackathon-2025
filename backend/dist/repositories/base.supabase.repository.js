"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSupabaseRepository = void 0;
const database_error_1 = require("../shared/exceptions/database.error");
class BaseSupabaseRepository {
    constructor(supabase, tableName, modelConstructor) {
        this.supabase = supabase;
        this.tableName = tableName;
        this.modelConstructor = modelConstructor;
    }
    async create(entity) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .insert(entity.toJSON())
            .single();
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return this.modelConstructor.fromJSON(data);
    }
    async findById(id) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*')
            .eq('id', id)
            .single();
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data ? this.modelConstructor.fromJSON(data) : null;
    }
    async findAll() {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .select('*');
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return data.map(item => this.modelConstructor.fromJSON(item));
    }
    async update(id, entity) {
        const { data, error } = await this.supabase
            .from(this.tableName)
            .update(entity)
            .eq('id', id)
            .single();
        if (error)
            throw new database_error_1.DatabaseError(error.message);
        return this.modelConstructor.fromJSON(data);
    }
    async delete(id) {
        const { error } = await this.supabase
            .from(this.tableName)
            .delete()
            .eq('id', id);
        if (error)
            throw new database_error_1.DatabaseError(error.message);
    }
}
exports.BaseSupabaseRepository = BaseSupabaseRepository;
//# sourceMappingURL=base.supabase.repository.js.map