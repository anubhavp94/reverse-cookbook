import { useState, useEffect } from 'react';
import { Ingredient, IngredientCategory } from '@reverse-cookbook/shared';
import { ingredientAPI } from '../services/api';

export const useIngredients = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [categories, setCategories] = useState<IngredientCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        setLoading(true);
        const [ingredientsData, categoriesData] = await Promise.all([
          ingredientAPI.getAllIngredients(),
          ingredientAPI.getIngredientsByCategory()
        ]);
        
        setIngredients(ingredientsData);
        setCategories(categoriesData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch ingredients');
        console.error('Error fetching ingredients:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  const searchIngredients = async (query: string): Promise<Ingredient[]> => {
    if (!query.trim()) {
      return ingredients;
    }

    try {
      const results = await ingredientAPI.searchIngredients(query);
      return results;
    } catch (err) {
      console.error('Error searching ingredients:', err);
      return ingredients.filter(ingredient =>
        ingredient.name.toLowerCase().includes(query.toLowerCase())
      );
    }
  };

  return {
    ingredients,
    categories,
    loading,
    error,
    searchIngredients
  };
};