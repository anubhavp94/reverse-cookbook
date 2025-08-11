import { Recipe, RecipeRequest, RecipeResponse } from '@reverse-cookbook/shared';
import { AIService } from './aiService';
import { DatabaseService } from './databaseService';

export class RecipeService {
  private aiService: AIService;
  private dbService: DatabaseService;

  constructor() {
    this.aiService = new AIService();
    this.dbService = new DatabaseService();
  }

  async generateRecipes(request: RecipeRequest): Promise<RecipeResponse> {
    try {
      const cachedRecipes = await this.dbService.findCachedRecipes(request);
      
      if (cachedRecipes.length > 0) {
        console.log('Returning cached recipes');
        return {
          recipes: cachedRecipes,
          totalCount: cachedRecipes.length
        };
      }

      const generatedRecipes = await this.aiService.generateRecipes(request);
      
      for (const recipe of generatedRecipes) {
        await this.dbService.saveRecipe(recipe, request);
      }

      return {
        recipes: generatedRecipes,
        totalCount: generatedRecipes.length
      };
    } catch (error) {
      console.error('Error in recipe service:', error);
      throw error;
    }
  }

  async saveRecipe(recipe: Recipe): Promise<Recipe> {
    return await this.dbService.saveRecipe(recipe);
  }

  async getRecipeById(id: string): Promise<Recipe | null> {
    return await this.dbService.getRecipeById(id);
  }

  async searchRecipes(query: string, cuisine?: string): Promise<Recipe[]> {
    return await this.dbService.searchRecipes(query, cuisine);
  }

  async getFavoriteRecipes(userId?: string): Promise<Recipe[]> {
    return await this.dbService.getFavoriteRecipes(userId);
  }
}