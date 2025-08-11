import { useState } from 'react';
import { Recipe, RecipeRequest, CuisineType } from '@reverse-cookbook/shared';
import { recipeAPI } from '../services/api';

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateRecipes = async (
    ingredients: string[],
    cuisine: CuisineType,
    preferences?: RecipeRequest['preferences']
  ): Promise<void> => {
    if (ingredients.length === 0 || !cuisine) {
      setError('Please select at least one ingredient and a cuisine type');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const request: RecipeRequest = {
        ingredients,
        cuisine,
        preferences
      };

      const response = await recipeAPI.generateRecipes(request);
      setRecipes(response.recipes);
    } catch (err) {
      console.error('Error generating recipes:', err);
      setError('Failed to generate recipes. Please try again.');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const searchRecipes = async (query: string, cuisine?: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await recipeAPI.searchRecipes(query, cuisine);
      setRecipes(response.recipes);
    } catch (err) {
      console.error('Error searching recipes:', err);
      setError('Failed to search recipes. Please try again.');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const clearRecipes = () => {
    setRecipes([]);
    setError(null);
  };

  return {
    recipes,
    loading,
    error,
    generateRecipes,
    searchRecipes,
    clearRecipes
  };
};