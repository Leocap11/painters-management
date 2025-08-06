const futuraDevEslintTypescript = require('@futura-dev/eslint-config-typescript');

module.exports = [
  ...futuraDevEslintTypescript.config,
  {
    ignores: ['dist', '**/*.js'],
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_$' }],
    },
  },
];

