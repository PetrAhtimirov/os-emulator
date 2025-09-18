import { defineConfig } from "eslint/config";
import pluginImport from "eslint-plugin-import";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    ignores: ["dist/**"],
  },

  // Wide rules for js/ts/tsx/vue
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,tsx,vue}"],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      import: pluginImport,
    },
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          alphabetize: { order: "asc" },
        },
      ],
    },
  },

  // TypeScript (include TSX)
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    extends: [...tseslint.configs.recommended],
  },

  // Vue
  {
    files: ["**/*.vue"],
    extends: [pluginVue.configs["flat/essential"]],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "vue/order-in-components": [
        "error",
        {
          order: [
            "el",
            "name",
            "components",
            "directives",
            "props",
            "emits",
            "setup",
            "data",
            "computed",
            "methods",
            "watch",
            "LIFECYCLE_HOOKS",
            "template",
            "render",
            "renderError",
          ],
        },
      ],
    },
  },
]);
