import axios from 'axios';
import { Recipe, RecipeRequest } from '@reverse-cookbook/shared';

export interface OllamaResponse {
  response: string;
  done: boolean;
}

export class AIService {
  private baseUrl: string;
  private model: string;

  constructor() {
    this.baseUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
    this.model = process.env.OLLAMA_MODEL || 'llama3.1:8b';
  }

  async generateRecipes(request: RecipeRequest): Promise<Recipe[]> {
    try {
      const prompt = this.buildRecipePrompt(request);
      const response = await this.callOllama(prompt);
      return this.parseRecipeResponse(response);
    } catch (error) {
      console.error('Error generating recipes:', error);
      throw new Error('Failed to generate recipes');
    }
  }

  private buildRecipePrompt(request: RecipeRequest): string {
    const { ingredients, cuisine, preferences } = request;
    
    let prompt = `Generate 3 ${cuisine} recipes using these ingredients: ${ingredients.join(', ')}.`;
    
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

  private async callOllama(prompt: string): Promise<string> {
    const response = await axios.post(`${this.baseUrl}/api/generate`, {
      model: this.model,
      prompt,
      stream: false,
      options: {
        temperature: 0.7,
        top_p: 0.9,
      }
    });

    return response.data.response;
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
      const response = await axios.get(`${this.baseUrl}/api/version`);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }
}