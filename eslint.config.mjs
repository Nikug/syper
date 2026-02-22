import { defineConfig, globalIgnores } from 'eslint/config'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import solid from 'eslint-plugin-solid/configs/typescript'
import * as tsParser from '@typescript-eslint/parser'

export default defineConfig([
  globalIgnores(['dist', 'tests', 'node_modules', '.yarn', '.pnp.cjs', '.pnp.loader.mjs']),
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    files: [['src/**', '**/*.{ts,tsx}']],
    ...solid,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: 'tsconfig.app.json',
      },
    },
  },
  {
    rules: {
      'no-unassigned-vars': 'off',
    },
  },
])
