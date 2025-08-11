import React, { useState } from 'react';
import { Recipe } from '@reverse-cookbook/shared';
import { RecipeCard } from './RecipeCard';
import { RecipeModal } from './RecipeModal';

interface RecipeGridProps {
  recipes: Recipe[];
  loading?: boolean;
  className?: string;
}

export const RecipeGrid: React.FC<RecipeGridProps> = ({
  recipes,
  loading = false,
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
          <span className="ml-2 text-gray-600">Generating recipes...</span>
        </div>
      </div>
    );
  }

  if (recipes.length === 0) {
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
          No recipes found
        </h3>
        <p className="text-gray-600">
          Select some ingredients and a cuisine type to get recipe recommendations.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onClick={() => handleRecipeClick(recipe)}
            className="h-full"
          />
        ))}
      </div>

      <RecipeModal
        recipe={selectedRecipe}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};