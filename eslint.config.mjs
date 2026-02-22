import { defineConfig, globalIgnores } from 'eslint/config'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import solid from 'eslint-plugin-solid/configs/typescript'
import * as tsParser from '@typescript-eslint/parser'

export default defineConfig(
  globalIgnores(['dist', 'tests', 'node_modules']),
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    files: [['src/*', '**/*.{ts,tsx}']],
    ...solid,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: 'tsconfig.app.json',
      },
    },
  }
)
