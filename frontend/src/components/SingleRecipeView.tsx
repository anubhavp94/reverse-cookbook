import React, { useState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Recipe } from '@reverse-cookbook/shared';
import { IngredientAlternativesModal } from './IngredientAlternativesModal';
import { IngredientAvailabilityList } from './IngredientAvailabilityList';
import { RecipeInstructionsPanel } from './RecipeInstructionsPanel';
import { useIngredientAlternatives } from '../hooks/useIngredientAlternatives';
import { useIngredientAvailability, IngredientStatus } from '../hooks/useIngredientAvailability';

interface SingleRecipeViewProps {
  recipe: Recipe | null;
  loading?: boolean;
  onNextRecipe?: () => void;
  userSelectedIngredients: string[];
  className?: string;
}

export const SingleRecipeView: React.FC<SingleRecipeViewProps> = ({
  recipe,
  loading = false,
  onNextRecipe,
  userSelectedIngredients,
  className = ''
}) => {
  const [isAlternativesModalOpen, setIsAlternativesModalOpen] = useState(false);
  const [, setCurrentIngredientForAlternatives] = useState<string>('');
  

  const { 
    alternatives, 
    loading: alternativesLoading, 
    getIngredientAlternatives,
    clearAlternatives
  } = useIngredientAlternatives();

  const {
    ingredientsList,
    setIngredientStatus,
    substituteIngredient,
  } = useIngredientAvailability({
    recipeIngredients: recipe?.ingredients || [],
    userSelectedIngredients
  });

  // Debug logging for ingredient status
  console.log('SingleRecipeView - Ingredient Status Debug:', {
    hasRecipe: !!recipe,
    recipeIngredients: recipe?.ingredients,
    userSelectedIngredients,
    ingredientsList: ingredientsList.map(item => ({
      ingredient: item.ingredient,
      status: item.status,
      isUserSelected: item.isUserSelected
    }))
  });

  const handleIngredientStatusChange = (ingredient: string, status: IngredientStatus) => {
    setIngredientStatus(ingredient, status);
  };

  const handleRequestAlternatives = async (ingredient: string) => {
    if (!recipe) return;
    
    setCurrentIngredientForAlternatives(ingredient);
    
    try {
      await getIngredientAlternatives({
        ingredient,
        recipeTitle: recipe.title,
        cuisine: recipe.cuisine
      });
      setIsAlternativesModalOpen(true);
    } catch (error) {
      console.error('Error getting ingredient alternatives:', error);
    }
  };

  const handleSelectSubstitute = (originalIngredient: string, substitute: string) => {
    substituteIngredient(originalIngredient, substitute);
    setIsAlternativesModalOpen(false);
    clearAlternatives();
    setCurrentIngredientForAlternatives('');
  };

  const handleCloseAlternativesModal = () => {
    setIsAlternativesModalOpen(false);
    clearAlternatives();
    setCurrentIngredientForAlternatives('');
  };

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <span className="ml-2 text-gray-600">Generating recipe...</span>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className={`text-center p-8 ${className}`}>
        <div className="text-gray-400 mb-4">
          <svg
            className="mx-auto h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No recipe found
        </h3>
        <p className="text-gray-600">
          Select some ingredients and a cuisine type to get a recipe recommendation.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Two-Column Layout */}
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${className}`}>
        {/* Left Column - Ingredients */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <IngredientAvailabilityList
            ingredients={ingredientsList}
            onStatusChange={handleIngredientStatusChange}
            onRequestAlternatives={handleRequestAlternatives}
          />
        </div>

        {/* Right Column - Instructions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <RecipeInstructionsPanel recipe={recipe} />
        </div>
      </div>

      {/* Next Recipe Button */}
      {onNextRecipe && (
        <div className="mt-6 text-center">
          <button
            onClick={onNextRecipe}
            disabled={loading}
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-base font-medium"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating...
              </>
            ) : (
              <>
                Next Recipe
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </div>
      )}

      <IngredientAlternativesModal
        alternatives={alternatives}
        isOpen={isAlternativesModalOpen}
        loading={alternativesLoading}
        onClose={handleCloseAlternativesModal}
        onSelectSubstitute={handleSelectSubstitute}
      />
    </>
  );
};