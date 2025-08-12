import React, { useState } from 'react';
import { CuisineType } from '@reverse-cookbook/shared';
import { IngredientSelector } from './components/IngredientSelector';
import { CuisineSelector } from './components/CuisineSelector';
import { SingleRecipeView } from './components/SingleRecipeView';
import { useRecipes } from './hooks/useRecipes';

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedCuisine, setSelectedCuisine] = useState<CuisineType | ''>('');
  const { recipe, loading, error, generateRecipe, generateNextRecipe, clearRecipe } = useRecipes();

  const handleGenerateRecipe = async () => {
    if (selectedIngredients.length === 0 || !selectedCuisine) {
      return;
    }

    await generateRecipe(selectedIngredients, selectedCuisine);
  };

  const handleNextRecipe = async () => {
    if (selectedIngredients.length === 0 || !selectedCuisine) {
      return;
    }

    await generateNextRecipe(selectedIngredients, selectedCuisine);
  };

  const handleReset = () => {
    setSelectedIngredients([]);
    setSelectedCuisine('');
    clearRecipe();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                🍳 Reverse Cookbook
              </h1>
              <p className="ml-4 text-sm text-gray-600 hidden sm:block">
                Get recipe recommendations based on your ingredients
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <IngredientSelector
              selectedIngredients={selectedIngredients}
              onIngredientsChange={setSelectedIngredients}
            />
            <CuisineSelector
              selectedCuisine={selectedCuisine}
              onCuisineChange={setSelectedCuisine}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleGenerateRecipe}
              disabled={selectedIngredients.length === 0 || !selectedCuisine || loading}
              className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Generating...' : 'Generate Recipe'}
            </button>
            
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Reset
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Recipe Recommendation
            </h2>
            {recipe && (
              <span className="text-sm text-gray-500">
                AI-generated recipe
              </span>
            )}
          </div>

          <SingleRecipeView
            recipe={recipe}
            loading={loading}
            onNextRecipe={handleNextRecipe}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-400">
              Powered by open-source AI models • Built with React & TypeScript
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
