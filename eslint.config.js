import { defineConfig } from 'eslint';

export default defineConfig([
  {
    files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: '@typescript-eslint/parser',
    },
    plugins: ['@typescript-eslint'],
    rules: {
      'no-console': 'warn',
      "@typescript-eslint/no-explicit-any": "off"
    },
    ignores: ['node_modules', 'dist', '.next', "src/generated"],  // Add ignored directories here
  },
]);