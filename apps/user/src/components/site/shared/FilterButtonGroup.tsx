'use client';

import React from 'react';

interface FilterItem {
  name: string;
  value: string;
}

interface FilterButtonGroupProps {
  items: FilterItem[];
  selectedValues: string[];
  onToggle: (value: string) => void;
}

const FilterButtonGroup = ({ items, selectedValues, onToggle }: FilterButtonGroupProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => {
        const isSelected = selectedValues.includes(item.value);
        return (
          <button
            key={item.value}
            onClick={() => onToggle(item.value)}
            className={`px-3 py-1 rounded-full border cursor-pointer transition-colors capitalize ${
              isSelected
                ? 'bg-blue-500 text-white dark:bg-blue-600 border-blue-500'
                : 'hover:bg-blue-100 dark:hover:bg-blue-700 dark:text-gray-300 border dark:border-gray-600'
            }`}
          >
            {item.name}
          </button>
        );
      })}
    </div>
  );
};

export default FilterButtonGroup;
