import eslint from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  eslint.configs.recommended, // Base ESLint rules
  { ignores: ['**/*.js', '**/*.spec.ts'] }, // Ignore JavaScript and Test files
  {
    files: ['**/*.ts'], // Lint TypeScript files
    languageOptions: {
      parser: tsParser,
      sourceType: 'module',
      globals: {
        __dirname: 'readonly', // Define __dirname as a global variable (readonly for safety)
      },
    },
    plugins: {
      '@typescript-eslint': ts,
      prettier,
    },
    rules: {
      ...prettierConfig.rules,
      complexity: ['error', 5],
      'prettier/prettier': 'error',
      'max-lines-per-function': ['error', { max: 40, skipComments: true, skipBlankLines: true }],
      'max-params': ['error', 3],
      'max-depth': ['error', 5],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
];
