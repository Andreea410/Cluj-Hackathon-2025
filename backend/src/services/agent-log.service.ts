import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { AgentLog } from '../models/agent-log.model';
import { AgentLogRepository } from '../repositories/agent-log.repository';

@Injectable()
export class AgentLogService extends BaseService<AgentLog> {
  constructor(private readonly agentLogRepository: AgentLogRepository) {
    super(agentLogRepository);
  }

  async createAgentLog(agentLog: AgentLog): Promise<AgentLog> {
    return this.create(agentLog);
  }

  async updateAgentLog(id: string, agentLog: Partial<AgentLog>): Promise<AgentLog> {
    return this.update(id, agentLog);
  }

  async findWithUser(id: string): Promise<AgentLog | null> {
    return this.agentLogRepository.findWithUser(id);
  }

  async findByUserAndRole(userId: string, role: string): Promise<AgentLog[]> {
    return this.agentLogRepository.findByUserAndRole(userId, role);
  }

  async findLatestByUser(userId: string, limit: number): Promise<AgentLog[]> {
    return this.agentLogRepository.findLatestByUser(userId, limit);
  }

  async findByUserId(userId: string): Promise<AgentLog[]> {
    return this.agentLogRepository.findByUserId(userId);
  }

  async findByRole(role: string): Promise<AgentLog[]> {
    return this.agentLogRepository.findByRole(role);
  }

  async findAllWithUsers(): Promise<AgentLog[]> {
    return this.agentLogRepository.findAllWithUsers();
  }
} 