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
        try {
            console.log(`Creating ${this.tableName} with data:`, entity.toJSON());
            const { data: insertData, error: insertError } = await this.supabase
                .from(this.tableName)
                .insert(entity.toJSON())
                .select()
                .single();
            if (insertError) {
                console.error(`Error inserting ${this.tableName}:`, insertError);
                throw new database_error_1.DatabaseError(`Failed to create record: ${insertError.message}`);
            }
            if (!insertData) {
                console.error(`No data returned after creating ${this.tableName}`);
                throw new database_error_1.DatabaseError('No data returned after creation');
            }
            console.log(`Successfully created ${this.tableName}:`, insertData);
            return this.modelConstructor.fromJSON(insertData);
        }
        catch (error) {
            console.error(`Error in create ${this.tableName}:`, error);
            if (error instanceof database_error_1.DatabaseError) {
                throw error;
            }
            throw new database_error_1.DatabaseError(`Failed to create record: ${error.message}`);
        }
    }
    async findById(id) {
        try {
            const { data, error } = await this.supabase
                .from(this.tableName)
                .select('*')
                .eq('id', id)
                .maybeSingle();
            if (error) {
                if (error.code === 'PGRST116') {
                    return null;
                }
                throw new database_error_1.DatabaseError(error.message);
            }
            return data ? this.modelConstructor.fromJSON(data) : null;
        }
        catch (error) {
            console.error('Error finding record:', error);
            return null;
        }
    }
    async findAll() {
        try {
            const { data, error } = await this.supabase
                .from(this.tableName)
                .select('*');
            if (error)
                throw new database_error_1.DatabaseError(error.message);
            return data.map(item => this.modelConstructor.fromJSON(item));
        }
        catch (error) {
            console.error('Error finding records:', error);
            throw new database_error_1.DatabaseError('Failed to fetch records');
        }
    }
    async update(id, entity) {
        try {
            const { data, error } = await this.supabase
                .from(this.tableName)
                .update(entity)
                .eq('id', id)
                .select()
                .single();
            if (error) {
                if (error.code === 'PGRST116') {
                    throw new database_error_1.DatabaseError('Record not found');
                }
                throw new database_error_1.DatabaseError(error.message);
            }
            return this.modelConstructor.fromJSON(data);
        }
        catch (error) {
            console.error('Error updating record:', error);
            throw new database_error_1.DatabaseError('Failed to update record');
        }
    }
    async delete(id) {
        try {
            const { error } = await this.supabase
                .from(this.tableName)
                .delete()
                .eq('id', id);
            if (error)
                throw new database_error_1.DatabaseError(error.message);
        }
        catch (error) {
            console.error('Error deleting record:', error);
            throw new database_error_1.DatabaseError('Failed to delete record');
        }
    }
}
exports.BaseSupabaseRepository = BaseSupabaseRepository;
//# sourceMappingURL=base.supabase.repository.js.map