import React from 'react';
import { 
  ClockIcon, 
  UserGroupIcon, 
  AcademicCapIcon,
  TagIcon 
} from '@heroicons/react/24/outline';
import { Recipe } from '@reverse-cookbook/shared';

interface RecipeCardProps {
  recipe: Recipe;
  onClick?: () => void;
  className?: string;
}

const difficultyColors = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  hard: 'bg-red-100 text-red-800'
};

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onClick,
  className = ''
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {recipe.title}
          </h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[recipe.difficulty]}`}>
            {recipe.difficulty}
          </span>
        </div>

        {/* Cuisine and Description */}
        <div className="mb-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 mb-2">
            <TagIcon className="w-3 h-3 mr-1" />
            {recipe.cuisine}
          </span>
          {recipe.description && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {recipe.description}
            </p>
          )}
        </div>

        {/* Recipe Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4" />
            <span>{recipe.cookingTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <UserGroupIcon className="w-4 h-4" />
            <span>{recipe.servings} servings</span>
          </div>
          <div className="flex items-center gap-1">
            <AcademicCapIcon className="w-4 h-4" />
            <span className="capitalize">{recipe.difficulty}</span>
          </div>
        </div>

        {/* Ingredients Preview */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Ingredients ({recipe.ingredients.length})
          </h4>
          <div className="flex flex-wrap gap-1">
            {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
              >
                {ingredient}
              </span>
            ))}
            {recipe.ingredients.length > 3 && (
              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
                +{recipe.ingredients.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Tags */}
        {recipe.tags && recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {recipe.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
            {recipe.tags.length > 3 && (
              <span className="inline-block px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-full">
                +{recipe.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};