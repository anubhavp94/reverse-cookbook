import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { IngredientStatusButton } from './IngredientStatusButton';
import { IngredientAvailabilityState, IngredientStatus } from '../hooks/useIngredientAvailability';

interface IngredientAvailabilityListProps {
  ingredients: IngredientAvailabilityState[];
  onStatusChange: (ingredient: string, status: IngredientStatus) => void;
  onRequestAlternatives: (ingredient: string) => void;
  className?: string;
}

export const IngredientAvailabilityList: React.FC<IngredientAvailabilityListProps> = ({
  ingredients,
  onStatusChange,
  onRequestAlternatives,
  className = ''
}) => {
  // Debug logging for ingredient display
  console.log('IngredientAvailabilityList - Display Debug:', {
    ingredientsLength: ingredients.length,
    ingredientsWithStatus: ingredients.map(item => ({
      name: item.ingredient,
      status: item.status,
      isUserSelected: item.isUserSelected,
      disabled: item.isUserSelected && item.status === 'available'
    }))
  });
  const handleStatusChange = (ingredient: string, status: IngredientStatus) => {
    if (status === 'unavailable') {
      // When marked as unavailable, immediately show alternatives
      onRequestAlternatives(ingredient);
    } else {
      onStatusChange(ingredient, status);
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="border-b border-gray-200 pb-3 mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Ingredients ({ingredients.length})
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Mark your ingredient availability
        </p>
      </div>

      <div className="space-y-2">
        {ingredients.map((ingredientState) => (
          <div
            key={ingredientState.ingredient}
            className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
              ingredientState.status === 'available'
                ? 'bg-green-50 border-green-200'
                : ingredientState.status === 'unavailable'
                ? 'bg-red-50 border-red-200'
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={`font-medium ${
                  ingredientState.status === 'available'
                    ? 'text-green-900'
                    : ingredientState.status === 'unavailable'
                    ? 'text-red-900'
                    : 'text-gray-900'
                }`}>
                  {ingredientState.ingredient}
                </span>
                
                {/* Show substitution indicator */}
                {ingredientState.substitute && ingredientState.substitute !== ingredientState.originalIngredient && (
                  <div className="flex items-center text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                    <ArrowRightIcon className="w-3 h-3 mr-1" />
                    <span>Substituted</span>
                  </div>
                )}
                
                {/* Show user-selected indicator */}
                {ingredientState.isUserSelected && (
                  <div className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                    Selected
                  </div>
                )}
              </div>
              
              {/* Show original ingredient if substituted */}
              {ingredientState.substitute && ingredientState.substitute !== ingredientState.originalIngredient && (
                <div className="text-sm text-gray-500 mt-1">
                  Originally: {ingredientState.originalIngredient}
                </div>
              )}
            </div>

            <IngredientStatusButton
              status={ingredientState.status}
              onStatusChange={(status) => handleStatusChange(ingredientState.ingredient, status)}
              disabled={ingredientState.isUserSelected && ingredientState.status === 'available'}
            />
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="text-sm text-blue-800">
          <div className="font-medium mb-1">Availability Summary:</div>
          <div className="space-y-1">
            <div>✅ Available: {ingredients.filter(i => i.status === 'available').length}</div>
            <div>❌ Unavailable: {ingredients.filter(i => i.status === 'unavailable').length}</div>
            <div>❓ Unknown: {ingredients.filter(i => i.status === 'unknown').length}</div>
            {ingredients.filter(i => i.substitute && i.substitute !== i.originalIngredient).length > 0 && (
              <div>🔄 Substituted: {ingredients.filter(i => i.substitute && i.substitute !== i.originalIngredient).length}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};