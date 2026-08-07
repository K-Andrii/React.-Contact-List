import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

export default [
  // ігнорування збірки
  { ignores: ['dist', 'node_modules'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      import: importPlugin,
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'simple-import-sort': simpleImportSort,
      prettier: prettierPlugin,
    },
    rules: {
      // базові правила
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...prettierConfig.rules,

      // налаштування форматування
      'prettier/prettier': ['error', {
        singleQuote: true,
        semi: true,
      }],

      // правила викладача
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'eqeqeq': 'error',
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'import/no-unused-modules': 'warn',
      'react/jsx-no-useless-fragment': 'warn',
      'react/no-array-index-key': 'error',
      'react/jsx-key': 'error',
      'react-hooks/exhaustive-deps': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/set-state-in-effect': 'off',

      // сортування імпортів
      'simple-import-sort/imports': ['warn', {
        groups: [
          ["^\\u0000"],
          ["^node:"],
          ["^react$", "^react-dom$"],
          ["^@?\\w"],
          ["^@/"],
          ["^~/" ],
          ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
          ["^\\./(?=.*/)", "^\\.(?!/?$)", "^\\./?$"],
          ["^.+\\.s?css$"],
        ],
      }],
      'simple-import-sort/exports': 'off',
    },
  }
];