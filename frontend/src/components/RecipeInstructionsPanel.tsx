import React from 'react';
import { 
  ClockIcon, 
  UserGroupIcon, 
  AcademicCapIcon,
  TagIcon 
} from '@heroicons/react/24/outline';
import { Recipe } from '@reverse-cookbook/shared';

interface RecipeInstructionsPanelProps {
  recipe: Recipe;
  className?: string;
}

const difficultyColors = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  hard: 'bg-red-100 text-red-800'
};

export const RecipeInstructionsPanel: React.FC<RecipeInstructionsPanelProps> = ({
  recipe,
  className = ''
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div>
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-2xl font-bold text-gray-900 leading-tight">
            {recipe.title}
          </h2>
          <span className={`px-3 py-1 rounded-full text-sm font-medium flex-shrink-0 ml-3 ${difficultyColors[recipe.difficulty]}`}>
            {recipe.difficulty}
          </span>
        </div>

        {/* Cuisine and Description */}
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 mb-3">
            <TagIcon className="w-4 h-4 mr-1" />
            {recipe.cuisine}
          </span>
          {recipe.description && (
            <p className="text-gray-600 leading-relaxed">
              {recipe.description}
            </p>
          )}
        </div>

        {/* Recipe Stats */}
        <div className="flex flex-wrap items-center gap-4 text-gray-600 border-t border-gray-200 pt-4">
          <div className="flex items-center gap-2">
            <ClockIcon className="w-5 h-5" />
            <span className="font-medium">{recipe.cookingTime} minutes</span>
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
      </div>

      {/* Instructions */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Instructions
        </h3>
        <div className="space-y-4">
          {recipe.instructions.map((instruction, index) => (
            <div
              key={index}
              className="flex gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="text-gray-800 leading-relaxed">
                  {instruction}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tags */}
      {recipe.tags && recipe.tags.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">
            Tags
          </h4>
          <div className="flex flex-wrap gap-2">
            {recipe.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Cooking Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-base font-semibold text-blue-900 mb-2">
          💡 Cooking Tips
        </h4>
        <div className="text-sm text-blue-800 space-y-1">
          <p>• Read through all instructions before starting</p>
          <p>• Prep all ingredients before cooking</p>
          <p>• Adjust seasoning to taste</p>
          {recipe.difficulty === 'hard' && (
            <p>• Take your time - this recipe requires attention to detail</p>
          )}
        </div>
      </div>
    </div>
  );
};