const { defineConfig } = require('eslint/config');

const tsParser = require('@typescript-eslint/parser');
const js = require('@eslint/js');

const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = defineConfig(
  [
    {
      extends: compat.extends('@repo/eslint-config/library.js'),

      languageOptions: {
        parser: tsParser,

        parserOptions: {
          project: true,
        },
      },

      rules: {
        'turbo/no-undeclared-env-vars': [
          'error',
          {
            allowList: ['NODE_ENV'],
          },
        ],
      },
    },
  ],
  globalIgnores(['src/generated/', 'node_modules/.prisma']),
);
