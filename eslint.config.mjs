import { defineConfig, globalIgnores } from 'eslint/config'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import solid from 'eslint-plugin-solid/configs/recommended'
import tsParser from '@typescript-eslint/parser'

export default defineConfig(
  globalIgnores(['dist']),
  js.configs.recommended,
  tseslint.config.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    ...solid,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: 'tsconfig.json',
      },
    },
  }
)
