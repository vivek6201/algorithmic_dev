"use client";

import React from "react";
import Select from "react-select";
import { useTheme } from "next-themes";

type Option = { label: string; value: string };

interface CustomSelectProps {
  value: string;
  options: Option[];
  defaultValue?: Option;
  onChange: (value: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  options,
  onChange,
  defaultValue,
  isLoading = false,
  placeholder = "Select...",
}) => {
  const selected = options.find((opt) => opt.value === value);
  const { theme } = useTheme();

  const isDark = theme === "dark";

  // Tailwind's neutral color equivalents
  const colors = {
    bg: isDark ? "#171717" : "#ffffff", // neutral-900 / white
    border: isDark ? "#3f3f46" : "#e5e5e5", // neutral-600 / neutral-200
    text: isDark ? "#f5f5f5" : "#111827", // neutral-100 / neutral-900
    placeholder: isDark ? "#a3a3a3" : "#6b7280", // neutral-400 / neutral-500
    focusBorder: "#3b82f6", // blue-500
    optionHover: isDark ? "#262626" : "#f5f5f5", // neutral-800 / neutral-100
    selected: "#6b7280", // blue-500
  };

  return (
    <Select
      options={options}
      value={selected}
      isLoading={isLoading}
      defaultValue={defaultValue}
      isSearchable
      placeholder={placeholder}
      onChange={(option) => onChange(option?.value || "")}
      styles={{
        control: (base, state) => ({
          ...base,
          padding: "0.06rem 0.25rem",
          borderRadius: "0.5rem",
          borderColor: state.isFocused ? colors.focusBorder : colors.border,
          boxShadow: state.isFocused
            ? `0 0 0 1px ${colors.focusBorder}`
            : undefined,
          backgroundColor: colors.bg,
          color: colors.text,
          minHeight: "30px",
        }),
        singleValue: (base) => ({
          ...base,
          color: colors.text,
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
            : "transparent",
          color: isSelected ? "white" : colors.text,
          cursor: "pointer",
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

export default CustomSelect;
