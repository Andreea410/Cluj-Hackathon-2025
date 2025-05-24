import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { IngredientService } from '../services/ingredient.service';
import { Ingredient } from '../models/ingredient.model';

@Controller('ingredients')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post()
  async createIngredient(@Body() ingredient: Ingredient): Promise<Ingredient> {
    try {
      return await this.ingredientService.createIngredient(ingredient);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getIngredient(@Param('id') id: string): Promise<Ingredient> {
    try {
      return await this.ingredientService.findById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async getAllIngredients(): Promise<Ingredient[]> {
    try {
      return await this.ingredientService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updateIngredient(
    @Param('id') id: string,
    @Body() ingredient: Partial<Ingredient>
  ): Promise<Ingredient> {
    try {
      return await this.ingredientService.updateIngredient(id, ingredient);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteIngredient(@Param('id') id: string): Promise<void> {
    try {
      await this.ingredientService.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
} 