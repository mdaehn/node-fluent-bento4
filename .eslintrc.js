module.exports = {
  env: {
    es6: true,
    node: true,
    mocha: true
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 8,
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  plugins: ['prettier', 'mocha'],
  rules: {
    'no-unused-vars': ['error', { vars: 'all', args: 'none', ignoreRestSiblings: false }],
    'no-undef': ['error', { typeof: true }],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es6',
        singleQuote: true,
        semi: false,
        useTabs: false,
        printWidth: 100,
        tabWidth: 2
      }
    ],
    'mocha/no-exclusive-tests': 'error'
  },
  globals: {}
}
