import React, { useState } from 'react';
import { 
  ClockIcon, 
  UserGroupIcon, 
  AcademicCapIcon,
  TagIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { Recipe } from '@reverse-cookbook/shared';
import { RecipeModal } from './RecipeModal';

interface SingleRecipeViewProps {
  recipe: Recipe | null;
  loading?: boolean;
  onNextRecipe?: () => void;
  className?: string;
}

const difficultyColors = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  hard: 'bg-red-100 text-red-800'
};

export const SingleRecipeView: React.FC<SingleRecipeViewProps> = ({
  recipe,
  loading = false,
  onNextRecipe,
  className = ''
}) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
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
      <div className={`max-w-2xl mx-auto ${className}`}>
        {/* Recipe Card */}
        <div
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
          onClick={() => handleRecipeClick(recipe)}
        >
          <div className="p-8">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-gray-900 line-clamp-2">
                {recipe.title}
              </h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[recipe.difficulty]}`}>
                {recipe.difficulty}
              </span>
            </div>

            {/* Cuisine and Description */}
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 mb-3">
                <TagIcon className="w-4 h-4 mr-1" />
                {recipe.cuisine}
              </span>
              {recipe.description && (
                <p className="text-gray-600 text-base leading-relaxed">
                  {recipe.description}
                </p>
              )}
            </div>

            {/* Recipe Stats */}
            <div className="flex items-center gap-6 mb-6 text-gray-500">
              <div className="flex items-center gap-2">
                <ClockIcon className="w-5 h-5" />
                <span className="font-medium">{recipe.cookingTime} min</span>
              </div>
              <div className="flex items-center gap-2">
                <UserGroupIcon className="w-5 h-5" />
                <span className="font-medium">{recipe.servings} servings</span>
              </div>
              <div className="flex items-center gap-2">
                <AcademicCapIcon className="w-5 h-5" />
                <span className="font-medium capitalize">{recipe.difficulty}</span>
              </div>
            </div>

            {/* Ingredients Preview */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Ingredients ({recipe.ingredients.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {recipe.ingredients.slice(0, 6).map((ingredient, index) => (
                  <span
                    key={index}
                    className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {ingredient}
                  </span>
                ))}
                {recipe.ingredients.length > 6 && (
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-500 text-sm rounded-full">
                    +{recipe.ingredients.length - 6} more
                  </span>
                )}
              </div>
            </div>

            {/* Instructions Preview */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Instructions
              </h4>
              <div className="text-gray-600">
                {recipe.instructions.slice(0, 2).map((instruction, index) => (
                  <p key={index} className="mb-2">
                    <span className="font-medium text-primary-600">{index + 1}.</span> {instruction}
                  </p>
                ))}
                {recipe.instructions.length > 2 && (
                  <p className="text-gray-500 italic">
                    +{recipe.instructions.length - 2} more steps... (click to view all)
                  </p>
                )}
              </div>
            </div>

            {/* Tags */}
            {recipe.tags && recipe.tags.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {recipe.tags.slice(0, 4).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block px-3 py-1 bg-gray-50 text-gray-600 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                  {recipe.tags.length > 4 && (
                    <span className="inline-block px-3 py-1 bg-gray-50 text-gray-500 text-sm rounded-full">
                      +{recipe.tags.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Click to view full recipe hint */}
            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                Click anywhere on this card to view the complete recipe
              </p>
            </div>
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
      </div>

      <RecipeModal
        recipe={selectedRecipe}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};