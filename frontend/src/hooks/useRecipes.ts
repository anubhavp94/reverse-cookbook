import { useState } from 'react';
import { Recipe, RecipeRequest, CuisineType } from '@reverse-cookbook/shared';
import { recipeAPI } from '../services/api';

export const useRecipes = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateRecipe = async (
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
      // Set the first (and only) recipe from the response
      setRecipe(response.recipes[0] || null);
    } catch (err) {
      console.error('Error generating recipe:', err);
      setError('Failed to generate recipe. Please try again.');
      setRecipe(null);
    } finally {
      setLoading(false);
    }
  };

  const searchRecipes = async (query: string, cuisine?: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await recipeAPI.searchRecipes(query, cuisine);
      setRecipe(response.recipes[0] || null);
    } catch (err) {
      console.error('Error searching recipes:', err);
      setError('Failed to search recipes. Please try again.');
      setRecipe(null);
    } finally {
      setLoading(false);
    }
  };

  const clearRecipe = () => {
    setRecipe(null);
    setError(null);
  };

  const generateNextRecipe = generateRecipe; // Alias for clarity

  return {
    recipe,
    loading,
    error,
    generateRecipe,
    generateNextRecipe,
    searchRecipes,
    clearRecipe
  };
};