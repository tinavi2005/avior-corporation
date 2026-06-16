import rootConfig from '../../eslint.config.mjs'

export default [
  ...rootConfig,
  {
    rules: {
      'no-undef': 'off',
    },
  },
]
