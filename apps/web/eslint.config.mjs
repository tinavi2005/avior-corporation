import { FlatCompat } from '@eslint/eslintrc'
import { fixupConfigRules } from '@eslint/compat'
import rootConfig from '../../eslint.config.mjs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({ baseDirectory: __dirname })

const nextCompatConfigs = fixupConfigRules(compat.extends('next/core-web-vitals'))

const config = [
  ...rootConfig,
  ...nextCompatConfigs,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]

export default config
