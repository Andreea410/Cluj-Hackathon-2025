import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { AgentLog } from '../models/agent-log.model';
import { AgentLogService } from '../services/agent-log.service';

@Controller('agent-logs')
export class AgentLogController {
  constructor(private readonly agentLogService: AgentLogService) {}

  @Post()
  async createAgentLog(@Body() agentLog: AgentLog): Promise<AgentLog> {
    try {
      return await this.agentLogService.createAgentLog(agentLog);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getAgentLog(
    @Param('id') id: string,
    @Query('includeUser') includeUser?: boolean
  ): Promise<AgentLog> {
    try {
      if (includeUser) {
        const log = await this.agentLogService.findWithUser(id);
        if (!log) throw new Error('Agent log not found');
        return log;
      }
      return await this.agentLogService.findById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async getAllAgentLogs(
    @Query('userId') userId?: string,
    @Query('role') role?: string,
    @Query('limit') limit?: string,
    @Query('includeUsers') includeUsers?: boolean
  ): Promise<AgentLog[]> {
    try {
      if (userId && role) {
        return await this.agentLogService.findByUserAndRole(userId, role);
      }
      if (userId && limit) {
        return await this.agentLogService.findLatestByUser(userId, parseInt(limit));
      }
      if (userId) {
        return await this.agentLogService.findByUserId(userId);
      }
      if (role) {
        return await this.agentLogService.findByRole(role);
      }
      if (includeUsers) {
        return await this.agentLogService.findAllWithUsers();
      }
      return await this.agentLogService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updateAgentLog(
    @Param('id') id: string,
    @Body() agentLog: Partial<AgentLog>
  ): Promise<AgentLog> {
    try {
      return await this.agentLogService.updateAgentLog(id, agentLog);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteAgentLog(@Param('id') id: string): Promise<void> {
    try {
      await this.agentLogService.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
} 