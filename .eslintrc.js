module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  'extends': [
    'standard',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2018,
    'sourceType': 'module',
    "project": "./tsconfig.json",
    "tsconfigRootDir": "."
  },
  'plugins': [
    'react-hooks'
  ],
  'settings': {
    'node': {
      'tryExtensions': [
        '.ts',
        '.tsx',
        '.js',
        '.jsx',
        '.json',
        '.node'
      ]
    }
  },
  'rules': {
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps':'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/type-annotation-spacing': 'off',
    'prettier/prettier': [
      'error',
      {
        'singleQuote': true,
        'semi': false
      }
    ]
  }
}
