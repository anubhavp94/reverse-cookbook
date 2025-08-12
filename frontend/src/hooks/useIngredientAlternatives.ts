import { useState } from 'react';
import { IngredientAlternativesRequest, IngredientAlternativesResponse } from '@reverse-cookbook/shared';
import { recipeAPI } from '../services/api';

export const useIngredientAlternatives = () => {
  const [alternatives, setAlternatives] = useState<IngredientAlternativesResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getIngredientAlternatives = async (request: IngredientAlternativesRequest): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await recipeAPI.getIngredientAlternatives(request);
      setAlternatives(response);
    } catch (err) {
      console.error('Error getting ingredient alternatives:', err);
      setError('Failed to get ingredient alternatives. Please try again.');
      setAlternatives(null);
    } finally {
      setLoading(false);
    }
  };

  const clearAlternatives = () => {
    setAlternatives(null);
    setError(null);
  };

  return {
    alternatives,
    loading,
    error,
    getIngredientAlternatives,
    clearAlternatives
  };
};