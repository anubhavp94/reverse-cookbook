import { GoogleGenAI } from '@google/genai';
import { Recipe, RecipeRequest } from '@reverse-cookbook/shared';

export class AIService {
  private genAI: GoogleGenAI;
  private model: string;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }
    
    this.genAI = new GoogleGenAI({ apiKey });
    this.model = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
  }

  async generateRecipes(request: RecipeRequest): Promise<Recipe[]> {
    try {
      const prompt = this.buildRecipePrompt(request);
      const response = await this.callGemini(prompt);
      return this.parseRecipeResponse(response);
    } catch (error) {
      console.error('Error generating recipes:', error);
      throw new Error('Failed to generate recipes');
    }
  }

  private buildRecipePrompt(request: RecipeRequest): string {
    const { ingredients, cuisine, preferences } = request;
    
    let prompt = `Generate 1 ${cuisine} recipe using these ingredients: ${ingredients.join(', ')}.`;
    
    if (preferences?.difficulty) {
      prompt += ` Difficulty level: ${preferences.difficulty}.`;
    }
    
    if (preferences?.maxCookingTime) {
      prompt += ` Maximum cooking time: ${preferences.maxCookingTime} minutes.`;
    }

    if (preferences?.servings) {
      prompt += ` Servings: ${preferences.servings}.`;
    }

    prompt += `

Return the response as a JSON array with this exact structure:
[
  {
    "title": "Recipe Name",
    "cuisine": "${cuisine}",
    "ingredients": ["ingredient 1", "ingredient 2"],
    "instructions": ["step 1", "step 2"],
    "cookingTime": 30,
    "servings": 4,
    "difficulty": "easy",
    "description": "Brief description"
  }
]

Only return the JSON array, no additional text.`;

    return prompt;
  }

  private async callGemini(prompt: string): Promise<string> {
    const response = await this.genAI.models.generateContent({
      model: this.model,
      contents: prompt
    });

    return response.text || '';
  }

  private parseRecipeResponse(response: string): Recipe[] {
    try {
      const cleanResponse = response.trim().replace(/```json\n?|\n?```/g, '');
      const recipes = JSON.parse(cleanResponse);
      
      return recipes.map((recipe: any, index: number) => ({
        id: `generated-${Date.now()}-${index}`,
        title: recipe.title || 'Untitled Recipe',
        cuisine: recipe.cuisine || 'Unknown',
        ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
        instructions: Array.isArray(recipe.instructions) ? recipe.instructions : [],
        cookingTime: recipe.cookingTime || 30,
        servings: recipe.servings || 4,
        difficulty: recipe.difficulty || 'medium',
        description: recipe.description || '',
        tags: recipe.tags || []
      }));
    } catch (error) {
      console.error('Error parsing recipe response:', error);
      console.error('Raw response:', response);
      throw new Error('Failed to parse recipe response');
    }
  }

  async checkHealth(): Promise<boolean> {
    try {
      await this.genAI.models.generateContent({
        model: this.model,
        contents: "Hello"
      });
      return true;
    } catch (error) {
      console.error('Gemini health check failed:', error);
      return false;
    }
  }
}