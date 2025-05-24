import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { SideEffectService } from '../services/side-effect.service';
import { SideEffect } from '../models/side-effect.model';

@Controller('side-effects')
export class SideEffectController {
  constructor(private readonly sideEffectService: SideEffectService) {}

  @Post()
  async createSideEffect(@Body() sideEffect: SideEffect): Promise<SideEffect> {
    try {
      return await this.sideEffectService.createSideEffect(sideEffect);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getSideEffects(@Query('search') search?: string): Promise<SideEffect[]> {
    try {
      if (search) {
        return await this.sideEffectService.searchSideEffects(search);
      }
      return await this.sideEffectService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('search/name')
  async searchByName(@Query('query') query: string): Promise<SideEffect[]> {
    try {
      return await this.sideEffectService.searchByName(query);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getSideEffect(@Param('id') id: string): Promise<SideEffect> {
    try {
      return await this.sideEffectService.findById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  async updateSideEffect(
    @Param('id') id: string,
    @Body() sideEffect: Partial<SideEffect>
  ): Promise<SideEffect> {
    try {
      return await this.sideEffectService.updateSideEffect(id, sideEffect);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteSideEffect(@Param('id') id: string): Promise<void> {
    try {
      await this.sideEffectService.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
} 