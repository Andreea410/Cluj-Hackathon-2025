import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { RoutineTemplateService } from '../services/routine-template.service';
import { RoutineTemplate } from '../models/routine-template.model';

@Controller('routine-templates')
export class RoutineTemplateController {
  constructor(private readonly routineTemplateService: RoutineTemplateService) {}

  @Post()
  async createTemplate(@Body() template: RoutineTemplate): Promise<RoutineTemplate> {
    try {
      return await this.routineTemplateService.createTemplate(template);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getTemplates(@Query('search') search?: string): Promise<RoutineTemplate[]> {
    try {
      return await this.routineTemplateService.searchTemplates(search);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('name/:name')
  async getTemplatesByName(@Param('name') name: string): Promise<RoutineTemplate[]> {
    try {
      return await this.routineTemplateService.findByName(name);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getTemplate(@Param('id') id: string): Promise<RoutineTemplate> {
    try {
      const template = await this.routineTemplateService.findById(id);
      if (!template) {
        throw new HttpException('Template not found', HttpStatus.NOT_FOUND);
      }
      return template;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  async updateTemplate(
    @Param('id') id: string,
    @Body() template: Partial<RoutineTemplate>
  ): Promise<RoutineTemplate> {
    try {
      return await this.routineTemplateService.updateTemplate(id, template);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteTemplate(@Param('id') id: string): Promise<void> {
    try {
      await this.routineTemplateService.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
} 