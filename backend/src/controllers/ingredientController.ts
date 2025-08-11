import { Request, Response, NextFunction } from 'express';
import { IngredientService } from '../services/ingredientService';
import { ApiResponse } from '@reverse-cookbook/shared';

export class IngredientController {
  private ingredientService: IngredientService;

  constructor() {
    this.ingredientService = new IngredientService();
  }

  getAllIngredients = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ingredients = await this.ingredientService.getAllIngredients();
      
      const response: ApiResponse = {
        success: true,
        data: ingredients
      };
      
      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  getIngredientsByCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const categories = await this.ingredientService.getIngredientsByCategory();
      
      const response: ApiResponse = {
        success: true,
        data: categories
      };
      
      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  searchIngredients = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { q: query } = req.query;
      
      if (!query || typeof query !== 'string') {
        res.status(400).json({
          success: false,
          error: 'Search query is required'
        } as ApiResponse);
        return;
      }
      
      const ingredients = await this.ingredientService.searchIngredients(query);
      
      const response: ApiResponse = {
        success: true,
        data: ingredients
      };
      
      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  getIngredient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      
      if (!id) {
        res.status(400).json({
          success: false,
          error: 'Ingredient ID is required'
        } as ApiResponse);
        return;
      }
      
      const ingredient = await this.ingredientService.getIngredientById(id);
      
      if (!ingredient) {
        res.status(404).json({
          success: false,
          error: 'Ingredient not found'
        } as ApiResponse);
        return;
      }
      
      const response: ApiResponse = {
        success: true,
        data: ingredient
      };
      
      res.json(response);
    } catch (error) {
      next(error);
    }
  };
}