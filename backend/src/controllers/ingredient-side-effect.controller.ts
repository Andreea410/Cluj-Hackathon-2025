import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { IngredientSideEffectService } from '../services/ingredient-side-effect.service';
import { IngredientSideEffect } from '../models/ingredient-side-effect.model';

@Controller('ingredient-side-effects')
export class IngredientSideEffectController {
  constructor(private readonly ingredientSideEffectService: IngredientSideEffectService) {}

  @Post()
  async createIngredientSideEffect(@Body() ingredientSideEffect: IngredientSideEffect): Promise<IngredientSideEffect> {
    try {
      return await this.ingredientSideEffectService.createIngredientSideEffect(ingredientSideEffect);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('bulk')
  async bulkCreateIngredientSideEffects(
    @Body() data: { ingredientId: string; sideEffectIds: string[] }
  ): Promise<IngredientSideEffect[]> {
    try {
      return await this.ingredientSideEffectService.bulkCreateIngredientSideEffects(
        data.ingredientId,
        data.sideEffectIds
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getIngredientSideEffect(
    @Param('id') id: string,
    @Query('includeRelations') includeRelations?: boolean
  ): Promise<IngredientSideEffect> {
    try {
      if (includeRelations) {
        const association = await this.ingredientSideEffectService.findWithRelations(id);
        if (!association) throw new Error('Ingredient-side effect association not found');
        return association;
      }
      return await this.ingredientSideEffectService.findById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async getAllIngredientSideEffects(
    @Query('ingredientId') ingredientId?: string,
    @Query('sideEffectId') sideEffectId?: string,
    @Query('includeRelations') includeRelations?: boolean,
    @Query('includeSideEffects') includeSideEffects?: boolean,
    @Query('includeIngredients') includeIngredients?: boolean
  ): Promise<IngredientSideEffect[]> {
    try {
      if (ingredientId && includeSideEffects) {
        return await this.ingredientSideEffectService.findAllByIngredientWithSideEffects(ingredientId);
      }
      if (sideEffectId && includeIngredients) {
        return await this.ingredientSideEffectService.findAllBySideEffectWithIngredients(sideEffectId);
      }
      if (ingredientId) {
        return await this.ingredientSideEffectService.findByIngredientId(ingredientId);
      }
      if (sideEffectId) {
        return await this.ingredientSideEffectService.findBySideEffectId(sideEffectId);
      }
      if (includeRelations) {
        return await this.ingredientSideEffectService.findAllWithRelations();
      }
      return await this.ingredientSideEffectService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updateIngredientSideEffect(
    @Param('id') id: string,
    @Body() ingredientSideEffect: Partial<IngredientSideEffect>
  ): Promise<IngredientSideEffect> {
    try {
      return await this.ingredientSideEffectService.updateIngredientSideEffect(id, ingredientSideEffect);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteIngredientSideEffect(@Param('id') id: string): Promise<void> {
    try {
      await this.ingredientSideEffectService.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
} 