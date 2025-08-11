import React from 'react';
import { Listbox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { CuisineType } from '@reverse-cookbook/shared';

interface CuisineSelectorProps {
  selectedCuisine: CuisineType | '';
  onCuisineChange: (cuisine: CuisineType) => void;
  className?: string;
}

const cuisines: CuisineType[] = [
  'Italian',
  'Chinese',
  'Indian',
  'Mexican',
  'French',
  'Thai',
  'Japanese',
  'Mediterranean',
  'American',
  'Korean',
  'Vietnamese',
  'Middle Eastern'
];

const cuisineDescriptions: Record<CuisineType, string> = {
  'Italian': 'Pasta, pizza, and Mediterranean flavors',
  'Chinese': 'Stir-fries, dumplings, and umami-rich dishes',
  'Indian': 'Spices, curries, and aromatic rice dishes',
  'Mexican': 'Tacos, salsas, and bold spiced cuisine',
  'French': 'Classic techniques and refined flavors',
  'Thai': 'Sweet, sour, and spicy balance',
  'Japanese': 'Fresh ingredients and delicate preparation',
  'Mediterranean': 'Olive oil, herbs, and fresh vegetables',
  'American': 'Comfort food and hearty portions',
  'Korean': 'Fermented flavors and spicy heat',
  'Vietnamese': 'Fresh herbs and light, flavorful broths',
  'Middle Eastern': 'Aromatic spices and grilled meats'
};

export const CuisineSelector: React.FC<CuisineSelectorProps> = ({
  selectedCuisine,
  onCuisineChange,
  className = ''
}) => {
  return (
    <div className={className}>
      <Listbox value={selectedCuisine} onChange={onCuisineChange}>
        <div className="relative">
          <Listbox.Label className="block text-sm font-medium text-gray-700 mb-2">
            Select Cuisine Type
          </Listbox.Label>
          
          <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm">
            <span className="block truncate">
              {selectedCuisine || 'Choose a cuisine...'}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {cuisines.map((cuisine) => (
              <Listbox.Option
                key={cuisine}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-primary-600 text-white' : 'text-gray-900'
                  }`
                }
                value={cuisine}
              >
                {({ selected, active }: { selected: boolean; active: boolean }) => (
                  <>
                    <div className="flex flex-col">
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                        {cuisine}
                      </span>
                      <span className={`text-xs ${active ? 'text-primary-200' : 'text-gray-500'}`}>
                        {cuisineDescriptions[cuisine]}
                      </span>
                    </div>
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
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
      
      {!selectedCuisine && (
        <p className="mt-2 text-sm text-gray-500">
          Select a cuisine type to get tailored recipe recommendations
        </p>
      )}
    </div>
  );
};