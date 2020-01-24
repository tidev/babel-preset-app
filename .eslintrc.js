module.exports = {
  root: true,
  extends: 'axway/env-node',
  overrides: [
    {
      files: ['test/**/*.spec.js'],
      extends: ['plugin:jest/all', 'plugin:jest/recommended'],
      globals: {
        'jest/globals': true
      }
    }
  ]
}
