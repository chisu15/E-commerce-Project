module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: '**/tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'simple-import-sort',
    'import',
    'unused-imports',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/linebreak-style': 0,
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/no-floating-promises': 'warn',
    // 'no-console': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          [
            '^@nestjs?\\w',
            // external libraries
            '^\\u0000',
            // internal libraries
            '^@?\\w',
            // other libraries
            '^[^.]',
          ],
        ],
      },
    ],
    'max-lines-per-function': ['error', { max: 150 }],
    'no-else-return': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'no-unused-vars': [
      'off',
      { vars: 'all', args: 'none', ignoreRestSiblings: true },
    ],
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
};
