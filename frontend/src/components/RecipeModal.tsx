import React from 'react';
import { Dialog } from '@headlessui/react';
import { 
  XMarkIcon,
  ClockIcon, 
  UserGroupIcon, 
  AcademicCapIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import { Recipe } from '@reverse-cookbook/shared';

interface RecipeModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
}

const difficultyColors = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  hard: 'bg-red-100 text-red-800'
};

export const RecipeModal: React.FC<RecipeModalProps> = ({
  recipe,
  isOpen,
  onClose
}) => {
  if (!recipe) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-4xl w-full bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-start justify-between p-6 border-b border-gray-200">
            <div className="flex-1 pr-4">
              <Dialog.Title className="text-2xl font-bold text-gray-900 mb-2">
                {recipe.title}
              </Dialog.Title>
              
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                  <TagIcon className="w-4 h-4 mr-1" />
                  {recipe.cuisine}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[recipe.difficulty]}`}>
                  {recipe.difficulty}
                </span>
              </div>

              {recipe.description && (
                <p className="text-gray-600 mb-4">
                  {recipe.description}
                </p>
              )}
            </div>
            
            <button
              onClick={onClose}
              className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            {/* Recipe Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <ClockIcon className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                <div className="text-lg font-semibold text-gray-900">{recipe.cookingTime}</div>
                <div className="text-sm text-gray-500">minutes</div>
              </div>
              <div className="text-center">
                <UserGroupIcon className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                <div className="text-lg font-semibold text-gray-900">{recipe.servings}</div>
                <div className="text-sm text-gray-500">servings</div>
              </div>
              <div className="text-center">
                <AcademicCapIcon className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                <div className="text-lg font-semibold text-gray-900 capitalize">{recipe.difficulty}</div>
                <div className="text-sm text-gray-500">level</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Ingredients */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Ingredients ({recipe.ingredients.length})
                </h3>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="flex items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 flex-shrink-0" />
                      <span className="text-gray-800">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Instructions ({recipe.instructions.length} steps)
                </h3>
                <ol className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <li
                      key={index}
                      className="flex items-start"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-gray-800 leading-relaxed">{instruction}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Tags */}
            {recipe.tags && recipe.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
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
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};