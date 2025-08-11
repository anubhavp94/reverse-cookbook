import React, { useState, useEffect } from 'react';
import { Combobox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Ingredient } from '@reverse-cookbook/shared';
import { useIngredients } from '../hooks/useIngredients';

interface IngredientSelectorProps {
  selectedIngredients: string[];
  onIngredientsChange: (ingredients: string[]) => void;
  className?: string;
}

export const IngredientSelector: React.FC<IngredientSelectorProps> = ({
  selectedIngredients,
  onIngredientsChange,
  className = ''
}) => {
  const { ingredients, searchIngredients, loading } = useIngredients();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Ingredient[]>([]);

  useEffect(() => {
    const performSearch = async () => {
      const results = await searchIngredients(query);
      setSearchResults(results);
    };

    performSearch();
  }, [query, ingredients, searchIngredients]);

  const addIngredient = (ingredient: Ingredient) => {
    if (!selectedIngredients.includes(ingredient.name)) {
      onIngredientsChange([...selectedIngredients, ingredient.name]);
    }
    setQuery('');
  };

  const removeIngredient = (ingredientName: string) => {
    onIngredientsChange(selectedIngredients.filter(name => name !== ingredientName));
  };

  const filteredIngredients = searchResults.filter(ingredient =>
    !selectedIngredients.includes(ingredient.name)
  );

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Ingredients
      </label>
      
      {/* Selected ingredients display */}
      {selectedIngredients.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {selectedIngredients.map((ingredientName) => (
            <span
              key={ingredientName}
              className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-800 text-sm rounded-md"
            >
              {ingredientName}
              <button
                onClick={() => removeIngredient(ingredientName)}
                className="hover:text-primary-600"
                type="button"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Ingredient search combobox */}
      <Combobox value={null} onChange={addIngredient}>
        <div className="relative">
          <Combobox.Input
            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm"
            onChange={(event) => setQuery(event.target.value)}
            value={query}
            placeholder="Search for ingredients..."
            displayValue={() => query}
          />
          
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>

          {filteredIngredients.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredIngredients.map((ingredient) => (
                <Combobox.Option
                  key={ingredient.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-primary-600 text-white' : 'text-gray-900'
                    }`
                  }
                  value={ingredient}
                >
                  {({ selected, active }: { selected: boolean; active: boolean }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                        {ingredient.name}
                      </span>
                      <span className={`text-xs ${active ? 'text-primary-200' : 'text-gray-500'}`}>
                        {ingredient.category}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : 'text-primary-600'
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>

      {loading && (
        <p className="mt-2 text-sm text-gray-500">Loading ingredients...</p>
      )}
      
      {selectedIngredients.length === 0 && (
        <p className="mt-2 text-sm text-gray-500">
          Select at least one ingredient to get recipe recommendations
        </p>
      )}
    </div>
  );
};