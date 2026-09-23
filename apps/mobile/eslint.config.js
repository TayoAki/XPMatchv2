// The app's lint config (run by the root "lint" script).
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

const RAW_COLOR = /^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*', '.expo/*', 'uniwind-types.d.ts', 'expo-env.d.ts'],
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      // UI plan §4.5: components use color tokens, never raw colors.
      'no-restricted-syntax': [
        'error',
        {
          selector: `Literal[value=${RAW_COLOR}]`,
          message: 'Use a color token (for example bg-primary), not a raw color.',
        },
        {
          selector: `TemplateElement[value.raw=${RAW_COLOR}]`,
          message: 'Use a color token (for example bg-primary), not a raw color.',
        },
      ],
    },
  },
]);
