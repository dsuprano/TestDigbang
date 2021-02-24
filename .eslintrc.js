module.exports = {
  root: true,
  extends: ['airbnb', 'prettier', 'prettier/react'],
  parser: 'babel-eslint',
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'jsx-a11y/href-no-hash': 'off',
    'no-underscore-dangle': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': [
      'warn',
      {
        ignore: ['navigation'],
      },
    ],
    'react/no-multi-comp': 'off',
    'react/prefer-stateless-function': [
      'warn',
      {
        ignorePureComponents: true,
      },
    ],
    'object-curly-newline': 'off',
    'prefer-default-export': 'off',
    'prefer-promise-reject-errors': 'off',
    'array-callback-return': 'off',
    'class-methods-use-this': 'off',
    'no-await-in-loop': 'warn',
    'import/no-cycle': [
      'warn',
      {
        maxDepth: 1,
      },
    ],
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  env: {
    browser: true,
  },
};
