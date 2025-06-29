'use client';

import React from 'react';
import Select from 'react-select';
import { useTheme } from 'next-themes';

type Option = { label: string; value: string };

interface CustomSelectProps {
  value: string | string[]; // support both single & multi
  options: Option[];
  defaultValue?: Option | Option[];
  onChange: (value: string | string[]) => void;
  isMulti?: boolean; // toggles between single and multi
  isLoading?: boolean;
  placeholder?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  options,
  onChange,
  defaultValue,
  isMulti = false,
  isLoading = false,
  placeholder = 'Select...',
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const colors = {
    bg: isDark ? '#020817' : '#ffffff',
    border: isDark ? '#3f3f46' : '#e5e5e5',
    text: isDark ? '#f5f5f5' : '#111827',
    placeholder: isDark ? '#a3a3a3' : '#6b7280',
    focusBorder: '#3b82f6',
    optionHover: isDark ? '#262626' : '#f5f5f5',
    selected: '#6b7280',
  };

  const selected = isMulti
    ? options.filter((opt) => Array.isArray(value) && value.includes(opt.value))
    : options.find((opt) => opt.value === value);

  return (
    <Select<Option, typeof isMulti>
      isMulti={isMulti}
      options={options}
      value={selected}
      isLoading={isLoading}
      defaultValue={defaultValue}
      isSearchable
      placeholder={placeholder}
      onChange={(selectedOption) => {
        if (isMulti) {
          const values = ((selectedOption as Option[]) || []).map((opt) => opt.value);
          onChange(values);
        } else {
          onChange((selectedOption as Option)?.value || '');
        }
      }}
      styles={{
        control: (base, state) => ({
          ...base,
          padding: '0.06rem 0.25rem',
          borderRadius: '0.5rem',
          borderColor: state.isFocused ? colors.focusBorder : colors.border,
          boxShadow: state.isFocused ? `0 0 0 1px ${colors.focusBorder}` : undefined,
          backgroundColor: colors.bg,
          color: colors.text,
          minHeight: '30px',
        }),
        singleValue: (base) => ({
          ...base,
          color: colors.text,
        }),
        multiValue: (base) => ({
          ...base,
          backgroundColor: isDark ? '#27272a' : '#e5e7eb',
        }),
        multiValueLabel: (base) => ({
          ...base,
          color: colors.text,
        }),
        multiValueRemove: (base) => ({
          ...base,
          color: colors.text,
          ':hover': {
            backgroundColor: colors.selected,
            color: 'white',
          },
        }),
        menu: (base) => ({
          ...base,
          zIndex: 20,
          backgroundColor: colors.bg,
        }),
        option: (base, { isFocused, isSelected }) => ({
          ...base,
          backgroundColor: isSelected
            ? colors.selected
            : isFocused
              ? colors.optionHover
              : 'transparent',
          color: isSelected ? 'white' : colors.text,
          cursor: 'pointer',
        }),
        input: (base) => ({
          ...base,
          color: colors.text,
        }),
        placeholder: (base) => ({
          ...base,
          color: colors.placeholder,
        }),
      }}
    />
  );
};
