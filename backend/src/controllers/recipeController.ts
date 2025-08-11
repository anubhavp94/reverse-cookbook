import { Request, Response, NextFunction } from 'express';
import { RecipeService } from '../services/recipeService';
import { RecipeRequest, ApiResponse } from '@reverse-cookbook/shared';
import { z } from 'zod';

const RecipeRequestSchema = z.object({
  ingredients: z.array(z.string()).min(1, 'At least one ingredient is required'),
  cuisine: z.string().min(1, 'Cuisine is required'),
  preferences: z.object({
    difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
    maxCookingTime: z.number().positive().optional(),
    servings: z.number().positive().optional(),
  }).optional()
});

export class RecipeController {
  private recipeService: RecipeService;

  constructor() {
    this.recipeService = new RecipeService();
  }

  generateRecipes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validatedRequest = RecipeRequestSchema.parse(req.body);
      
      const result = await this.recipeService.generateRecipes(validatedRequest);
      
      const response: ApiResponse = {
        success: true,
        data: result
      };
      
      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  getRecipe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      
      if (!id) {
        res.status(400).json({
          success: false,
          error: 'Recipe ID is required'
        } as ApiResponse);
        return;
      }
      
      const recipe = await this.recipeService.getRecipeById(id);
      
      if (!recipe) {
        res.status(404).json({
          success: false,
          error: 'Recipe not found'
        } as ApiResponse);
        return;
      }
      
      const response: ApiResponse = {
        success: true,
        data: recipe
      };
      
      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  searchRecipes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { q: query, cuisine } = req.query;
      
      if (!query || typeof query !== 'string') {
        res.status(400).json({
          success: false,
          error: 'Search query is required'
        } as ApiResponse);
        return;
      }
      
      const recipes = await this.recipeService.searchRecipes(
        query, 
        typeof cuisine === 'string' ? cuisine : undefined
      );
      
      const response: ApiResponse = {
        success: true,
        data: {
          recipes,
          totalCount: recipes.length
        }
      };
      
      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  getFavorites = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userId } = req.query;
      
      const recipes = await this.recipeService.getFavoriteRecipes(
        typeof userId === 'string' ? userId : undefined
      );
      
      const response: ApiResponse = {
        success: true,
        data: {
          recipes,
          totalCount: recipes.length
        }
      };
      
      res.json(response);
    } catch (error) {
      next(error);
    }
  };
}