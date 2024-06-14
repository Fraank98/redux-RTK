import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.jsx', '**/*.tsx'],
    plugins: {
      react: react,
    },
    languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
  },
  eslintPluginPrettierRecommended,
];
