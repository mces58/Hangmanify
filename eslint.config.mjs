import js from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import customTsRules from './plugins/rules/index.mjs';

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { project: 'tsconfig.json', tsconfigRootDir: import.meta.dirname },
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: { js, '@custom-typescript': customTsRules },
    extends: ['js/recommended'],
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    ignores: [
      'node_modules',
      'plugins',
      '.storybook',
      'babel.config.js',
      'metro.config.js',
    ],
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    rules: {
      //* custom rules
      '@custom-typescript/filename-match-component': 'error',
      '@custom-typescript/jsx-sort-props': 'error',
      '@custom-typescript/require-try-catch-async': 'error',
      '@custom-typescript/require-usestate-type': 'error',

      //- typescript rules
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-deprecated': 'error',
      '@typescript-eslint/no-duplicate-enum-values': 'error',
      '@typescript-eslint/no-duplicate-type-constituents': 'error',
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-mixed-enums': 'error',
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',

      //+ native eslint rules
      semi: ['error', 'always'],
      curly: ['error', 'multi-or-nest'],
      eqeqeq: 'error',
      yoda: 'error',
      camelcase: [
        'error',
        {
          properties: 'always',
          ignoreDestructuring: true,
          ignoreImports: true,
          ignoreGlobals: true,
        },
      ],
      'arrow-body-style': ['error', 'as-needed'],
      'block-scoped-var': 'error',
      'capitalized-comments': ['error', 'never'],
      'consistent-return': 'error',
      'default-case': 'error',
      'default-case-last': 'error',
      'default-param-last': ['error'],
      'for-direction': 'error',
      'func-name-matching': ['error', 'never'],
      'func-names': ['error', 'as-needed'],
      'guard-for-in': 'error',
      'id-length': ['error', { exceptions: ['x', 'y', 'z', 'i'], max: 30, min: 2 }],
      'logical-assignment-operators': ['error', 'always'],
      'no-alert': 'error',
      'no-array-constructor': 'error',
      'no-bitwise': 'error',
      'no-case-declarations': 'error',
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
      'no-delete-var': 'error',
      'no-else-return': ['error', { allowElseIf: true }],
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-empty-function': ['error', { allow: ['arrowFunctions'] }],
      'no-eq-null': 'error',
      'no-eval': 'error',
      'no-extra-bind': 'error',
      'no-extra-boolean-cast': 'error',
      'no-labels': 'error',
      'no-lonely-if': 'error',
      'no-multi-str': 'error',
      'no-nested-ternary': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-octal': 'error',
      'no-param-reassign': 'error',
      'no-shadow': 'error',
      'no-shadow-restricted-names': 'error',
      'no-throw-literal': 'error',
      'no-undef-init': 'error',
      'no-undefined': 'error',
      'no-unneeded-ternary': 'error',
      'no-var': 'error',
      'no-await-in-loop': 'error',
      'no-compare-neg-zero': 'error',
      'no-cond-assign': 'error',
      'no-constant-binary-expression': 'error',
      'no-dupe-else-if': 'error',
      'no-duplicate-case': 'error',
      'no-duplicate-imports': 'error',
      'no-ex-assign': 'error',
      'no-loss-of-precision': 'error',
      'no-sparse-arrays': 'error',
      'no-template-curly-in-string': 'error',
      'no-unsafe-finally': 'error',
      'prefer-exponentiation-operator': 'error',
      'prefer-object-has-own': 'error',
      'prefer-object-spread': 'error',
      'prefer-promise-reject-errors': 'error',
      'prefer-regex-literals': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      'require-await': 'error',
      'sort-vars': 'error',
      'use-isnan': 'error',
      'valid-typeof': 'error',
    },
  },
]);
