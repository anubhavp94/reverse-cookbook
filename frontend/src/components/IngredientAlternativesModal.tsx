import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon, CheckCircleIcon, ArrowRightCircleIcon, CheckIcon } from '@heroicons/react/24/outline';
import { IngredientAlternativesResponse } from '@reverse-cookbook/shared';

interface IngredientAlternativesModalProps {
  alternatives: IngredientAlternativesResponse | null;
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
  onSelectSubstitute?: (originalIngredient: string, substitute: string) => void;
}

export const IngredientAlternativesModal: React.FC<IngredientAlternativesModalProps> = ({
  alternatives,
  isOpen,
  loading,
  onClose,
  onSelectSubstitute
}) => {
  const [selectedAlternative, setSelectedAlternative] = useState<string | null>(null);

  const handleSelectAlternative = (alternativeName: string) => {
    setSelectedAlternative(alternativeName);
  };

  const handleConfirmSubstitution = () => {
    if (alternatives && selectedAlternative && onSelectSubstitute) {
      onSelectSubstitute(alternatives.ingredient, selectedAlternative);
      setSelectedAlternative(null);
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedAlternative(null);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md w-full bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-lg font-semibold text-gray-900">
              {loading ? 'Getting alternatives...' : alternatives ? `Alternatives for "${alternatives.ingredient}"` : 'Ingredient Alternatives'}
            </Dialog.Title>
            <button
              type="button"
              className="rounded-full p-1 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              onClick={handleClose}
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              <span className="ml-3 text-gray-600">Finding alternatives...</span>
            </div>
          )}

          {/* Content */}
          {!loading && alternatives && (
            <div>
              {/* Optional Ingredient */}
              {alternatives.isOptional && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-green-800 font-medium">
                        This ingredient is optional!
                      </p>
                      <p className="text-green-700 text-sm mt-1">
                        You can skip "{alternatives.ingredient}" without significantly affecting the recipe.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Alternatives List */}
              {alternatives.alternatives && alternatives.alternatives.length > 0 && (
                <div>
                  <h4 className="text-base font-medium text-gray-800 mb-3 flex items-center">
                    <ArrowRightCircleIcon className="h-5 w-5 text-primary-600 mr-2" />
                    {alternatives.isOptional ? 'Or try these alternatives:' : 'Suitable alternatives:'}
                  </h4>
                  <div className="space-y-3">
                    {alternatives.alternatives.map((alternative, index) => (
                      <button
                        key={index}
                        onClick={() => handleSelectAlternative(alternative.name)}
                        className={`w-full p-3 rounded-lg border text-left transition-colors ${
                          selectedAlternative === alternative.name
                            ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-500'
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 mb-1">
                              {alternative.name}
                            </div>
                            <div className="text-sm text-gray-600">
                              {alternative.explanation}
                            </div>
                          </div>
                          {selectedAlternative === alternative.name && (
                            <CheckIcon className="w-5 h-5 text-blue-600 ml-2 flex-shrink-0" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* No alternatives case */}
              {!alternatives.isOptional && (!alternatives.alternatives || alternatives.alternatives.length === 0) && (
                <div className="text-center py-6">
                  <p className="text-gray-500">
                    No suitable alternatives found for "{alternatives.ingredient}" in this recipe.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              onClick={handleClose}
            >
              Cancel
            </button>
            
            {/* Show substitute button only if alternatives exist and user made selection */}
            {alternatives && alternatives.alternatives.length > 0 && selectedAlternative && onSelectSubstitute && (
              <button
                type="button"
                onClick={handleConfirmSubstitution}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Use "{selectedAlternative}"
              </button>
            )}
            
            {/* Show skip button for optional ingredients */}
            {alternatives && alternatives.isOptional && (
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
              >
                Skip (Optional)
              </button>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};