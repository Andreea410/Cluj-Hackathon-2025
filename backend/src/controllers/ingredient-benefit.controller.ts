import { Controller, Get, Post, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { IngredientBenefitService } from '../services/ingredient-benefit.service';
import { IngredientBenefit } from '../models/ingredient-benefit.model';
import { Benefit } from '../models/benefit.model';
import { Ingredient } from '../models/ingredient.model';

@Controller('ingredient-benefits')
export class IngredientBenefitController {
  constructor(private readonly ingredientBenefitService: IngredientBenefitService) {}

  @Post(':ingredientId/benefits/:benefitId')
  async linkIngredientToBenefit(
    @Param('ingredientId') ingredientId: string,
    @Param('benefitId') benefitId: string
  ): Promise<IngredientBenefit> {
    try {
      return await this.ingredientBenefitService.linkIngredientToBenefit(ingredientId, benefitId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':ingredientId/benefits/:benefitId')
  async unlinkIngredientFromBenefit(
    @Param('ingredientId') ingredientId: string,
    @Param('benefitId') benefitId: string
  ): Promise<void> {
    try {
      await this.ingredientBenefitService.unlinkIngredientFromBenefit(ingredientId, benefitId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get('ingredients/:ingredientId/benefits')
  async getBenefitsForIngredient(@Param('ingredientId') ingredientId: string): Promise<Benefit[]> {
    try {
      return await this.ingredientBenefitService.getBenefitsForIngredient(ingredientId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('benefits/:benefitId/ingredients')
  async getIngredientsForBenefit(@Param('benefitId') benefitId: string): Promise<Ingredient[]> {
    try {
      return await this.ingredientBenefitService.getIngredientsForBenefit(benefitId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
} 