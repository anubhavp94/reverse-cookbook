import React from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { IngredientStatus } from '../hooks/useIngredientAvailability';

interface IngredientStatusButtonProps {
  status: IngredientStatus;
  onStatusChange: (status: IngredientStatus) => void;
  disabled?: boolean;
}

export const IngredientStatusButton: React.FC<IngredientStatusButtonProps> = ({
  status,
  onStatusChange,
  disabled = false
}) => {
  if (status === 'available') {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={() => !disabled && onStatusChange('available')}
          disabled={disabled}
          className={`p-1.5 rounded-full transition-colors ${
            disabled 
              ? 'bg-green-100 text-green-600 cursor-not-allowed opacity-75' 
              : 'bg-green-100 text-green-600 hover:bg-green-200'
          }`}
          title={disabled ? "User-selected ingredient" : "Mark as available"}
        >
          <CheckIcon className="w-4 h-4" />
        </button>
      </div>
    );
  }

  if (status === 'unavailable') {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={() => onStatusChange('unavailable')}
          className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
          title="Mark as unavailable"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // status === 'unknown' - show both options
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onStatusChange('available')}
        className="p-1.5 rounded-full bg-gray-100 text-green-600 hover:bg-green-100 hover:text-green-700 transition-colors"
        title="Mark as available"
      >
        <CheckIcon className="w-4 h-4" />
      </button>
      <button
        onClick={() => onStatusChange('unavailable')}
        className="p-1.5 rounded-full bg-gray-100 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
        title="Mark as unavailable"
      >
        <XMarkIcon className="w-4 h-4" />
      </button>
    </div>
  );
};