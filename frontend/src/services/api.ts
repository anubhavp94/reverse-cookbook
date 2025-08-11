import axios from 'axios';
import { 
  Recipe, 
  RecipeRequest, 
  RecipeResponse, 
  Ingredient, 
  IngredientCategory,
  ApiResponse 
} from '@reverse-cookbook/shared';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const recipeAPI = {
  generateRecipes: async (request: RecipeRequest): Promise<RecipeResponse> => {
    const response = await api.post<ApiResponse<RecipeResponse>>('/recipes/generate', request);
    return response.data.data!;
  },

  getRecipe: async (id: string): Promise<Recipe> => {
    const response = await api.get<ApiResponse<Recipe>>(`/recipes/${id}`);
    return response.data.data!;
  },

  searchRecipes: async (query: string, cuisine?: string): Promise<RecipeResponse> => {
    const response = await api.get<ApiResponse<RecipeResponse>>('/recipes/search', {
      params: { q: query, cuisine }
    });
    return response.data.data!;
  },

  getFavoriteRecipes: async (userId?: string): Promise<RecipeResponse> => {
    const response = await api.get<ApiResponse<RecipeResponse>>('/recipes/favorites', {
      params: { userId }
    });
    return response.data.data!;
  }
};

export const ingredientAPI = {
  getAllIngredients: async (): Promise<Ingredient[]> => {
    const response = await api.get<ApiResponse<Ingredient[]>>('/ingredients');
    return response.data.data!;
  },

  getIngredientsByCategory: async (): Promise<IngredientCategory[]> => {
    const response = await api.get<ApiResponse<IngredientCategory[]>>('/ingredients/categories');
    return response.data.data!;
  },

  searchIngredients: async (query: string): Promise<Ingredient[]> => {
    const response = await api.get<ApiResponse<Ingredient[]>>('/ingredients/search', {
      params: { q: query }
    });
    return response.data.data!;
  },

  getIngredient: async (id: string): Promise<Ingredient> => {
    const response = await api.get<ApiResponse<Ingredient>>(`/ingredients/${id}`);
    return response.data.data!;
  }
};

export default api;