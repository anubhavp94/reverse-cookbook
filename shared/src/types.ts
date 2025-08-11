export interface Ingredient {
  id: string;
  name: string;
  category: string;
}

export interface Recipe {
  id: string;
  title: string;
  cuisine: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  description?: string;
  tags?: string[];
}

export interface RecipeRequest {
  ingredients: string[];
  cuisine: string;
  preferences?: {
    difficulty?: 'easy' | 'medium' | 'hard';
    maxCookingTime?: number;
    servings?: number;
  };
}

export interface RecipeResponse {
  recipes: Recipe[];
  totalCount: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export type CuisineType = 
  | 'Italian'
  | 'Chinese' 
  | 'Indian'
  | 'Mexican'
  | 'French'
  | 'Thai'
  | 'Japanese'
  | 'Mediterranean'
  | 'American'
  | 'Korean'
  | 'Vietnamese'
  | 'Middle Eastern';

export interface IngredientCategory {
  name: string;
  ingredients: Ingredient[];
}