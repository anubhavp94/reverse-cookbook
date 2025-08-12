import { useState, useCallback, useMemo, useEffect } from 'react';

export type IngredientStatus = 'available' | 'unavailable' | 'unknown';

export interface IngredientAvailabilityState {
  ingredient: string;
  originalIngredient: string; // Track original ingredient if substituted
  status: IngredientStatus;
  isUserSelected: boolean; // From original recipe generation ingredients
  substitute?: string; // If substituted
}

interface UseIngredientAvailabilityProps {
  recipeIngredients: string[];
  userSelectedIngredients: string[];
}

export const useIngredientAvailability = ({
  recipeIngredients,
  userSelectedIngredients
}: UseIngredientAvailabilityProps) => {
  // Initialize ingredient availability based on user-selected ingredients
  const initialAvailabilityMap = useMemo(() => {
    const map = new Map<string, IngredientAvailabilityState>();
    
    recipeIngredients.forEach(ingredient => {
      const isUserSelected = userSelectedIngredients.some(
        userIngredient => userIngredient.toLowerCase() === ingredient.toLowerCase()
      );
      
      // Debug: Check ingredient matching
      if (userSelectedIngredients.length > 0) {
        console.log('Ingredient matching:', {
          ingredient,
          userSelected: userSelectedIngredients,
          isMatch: isUserSelected
        });
      }
      
      map.set(ingredient, {
        ingredient,
        originalIngredient: ingredient,
        status: isUserSelected ? 'available' : 'unknown',
        isUserSelected,
      });
    });
    
    return map;
  }, [recipeIngredients, userSelectedIngredients]);

  const [availabilityMap, setAvailabilityMap] = useState<Map<string, IngredientAvailabilityState>>(
    initialAvailabilityMap
  );

  // Update availabilityMap when recipe ingredients change
  useEffect(() => {
    console.log('useIngredientAvailability - Props Update:', {
      recipeIngredients,
      userSelectedIngredients,
      mapSize: initialAvailabilityMap.size
    });
    setAvailabilityMap(initialAvailabilityMap);
  }, [initialAvailabilityMap, recipeIngredients, userSelectedIngredients]);

  const setIngredientStatus = useCallback((ingredient: string, status: IngredientStatus) => {
    setAvailabilityMap(prev => {
      const updated = new Map(prev);
      const current = updated.get(ingredient);
      if (current) {
        updated.set(ingredient, {
          ...current,
          status
        });
      }
      return updated;
    });
  }, []);

  const substituteIngredient = useCallback((
    originalIngredient: string, 
    substituteIngredient: string
  ) => {
    setAvailabilityMap(prev => {
      const updated = new Map(prev);
      const current = updated.get(originalIngredient);
      if (current) {
        // Remove the original ingredient
        updated.delete(originalIngredient);
        
        // Add the substitute with available status
        updated.set(substituteIngredient, {
          ingredient: substituteIngredient,
          originalIngredient: current.originalIngredient,
          status: 'available',
          isUserSelected: current.isUserSelected,
          substitute: substituteIngredient
        });
      }
      return updated;
    });
  }, []);

  const resetIngredientAvailability = useCallback(() => {
    setAvailabilityMap(initialAvailabilityMap);
  }, [initialAvailabilityMap]);

  const getIngredientState = useCallback((ingredient: string): IngredientAvailabilityState | undefined => {
    return availabilityMap.get(ingredient);
  }, [availabilityMap]);

  // Derived state
  const ingredientsList = useMemo(() => {
    return Array.from(availabilityMap.values());
  }, [availabilityMap]);

  const availableIngredients = useMemo(() => {
    return ingredientsList.filter(item => item.status === 'available');
  }, [ingredientsList]);

  const unavailableIngredients = useMemo(() => {
    return ingredientsList.filter(item => item.status === 'unavailable');
  }, [ingredientsList]);

  const unknownIngredients = useMemo(() => {
    return ingredientsList.filter(item => item.status === 'unknown');
  }, [ingredientsList]);

  const substitutedIngredients = useMemo(() => {
    return ingredientsList.filter(item => item.substitute && item.substitute !== item.originalIngredient);
  }, [ingredientsList]);

  const finalIngredientsList = useMemo(() => {
    return ingredientsList.map(item => item.ingredient);
  }, [ingredientsList]);

  return {
    // State
    ingredientsList,
    availableIngredients,
    unavailableIngredients,
    unknownIngredients,
    substitutedIngredients,
    finalIngredientsList,
    
    // Actions
    setIngredientStatus,
    substituteIngredient,
    resetIngredientAvailability,
    getIngredientState,
  };
};