import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { AgentLog } from '../models/agent-log.model';
import { BaseSupabaseRepository } from '../repositories/base.supabase.repository';

@Injectable()
export class AgentLogService extends BaseService<AgentLog> {
  constructor(private readonly agentLogRepository: BaseSupabaseRepository<AgentLog>) {
    super(agentLogRepository);
  }

  async createAgentLog(agentLog: AgentLog): Promise<AgentLog> {
    // Validate message format
    this.validateMessage(agentLog.message);
    
    // Validate role
    this.validateRole(agentLog.role);
    
    return this.create(agentLog);
  }

  async findByUserId(userId: string): Promise<AgentLog[]> {
    return this.agentLogRepository.find({ user_id: userId });
  }

  async findByRole(role: string): Promise<AgentLog[]> {
    return this.agentLogRepository.findByRole(role);
  }

  async findByUserAndRole(userId: string, role: string): Promise<AgentLog[]> {
    return this.agentLogRepository.findByUserAndRole(userId, role);
  }

  async findWithUser(id: string): Promise<AgentLog | null> {
    return this.agentLogRepository.findWithUser(id);
  }

  async findAllWithUsers(): Promise<AgentLog[]> {
    return this.agentLogRepository.findAllWithUsers();
  }

  async findLatestByUser(userId: string, limit: number = 10): Promise<AgentLog[]> {
    return this.agentLogRepository.findLatestByUser(userId, limit);
  }

  async updateAgentLog(id: string, agentLog: Partial<AgentLog>): Promise<AgentLog> {
    // Don't allow modification of user_id for data integrity
    const { user_id, ...updateData } = agentLog;

    // Validate message if it's being updated
    if (updateData.message) {
      this.validateMessage(updateData.message);
    }

    // Validate role if it's being updated
    if (updateData.role) {
      this.validateRole(updateData.role);
    }

    return this.update(id, updateData);
  }

  private validateMessage(message: Record<string, any>): void {
    if (!message || typeof message !== 'object') {
      throw new Error('Message must be a valid JSON object');
    }
  }

  private validateRole(role: string): void {
    const validRoles = ['user', 'assistant', 'system', 'function'];
    if (!validRoles.includes(role)) {
      throw new Error(`Role must be one of: ${validRoles.join(', ')}`);
    }
  }

  async create(log: AgentLog): Promise<AgentLog> {
    return this.agentLogRepository.create(log);
  }
} 