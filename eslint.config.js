// import js from "@eslint/js";
// import pluginImport from "eslint-plugin-import";
// import pluginJsxA11y from "eslint-plugin-jsx-a11y";
// import pluginPrettier from "eslint-plugin-prettier";
// import pluginReact from "eslint-plugin-react";
// import pluginReactHooks from "eslint-plugin-react-hooks";
// import globals from "globals";
// export default defineConfig([
//   {
//     files: ["**/*.{js,mjs,cjs,jsx}"],
//     plugins: {
//       js,
//       react: pluginReact,
//       "react-hooks": pluginReactHooks,
//       "jsx-a11y": pluginJsxA11y,
//       import: pluginImport,
//       prettier: pluginPrettier,
//     },
//     extends: ["js/recommended"],
//     languageOptions: { globals: globals.browser },
//   },
//   // pluginReact.configs.flat.recommended,
// ]);
import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import pluginImport from "eslint-plugin-import";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import pluginPrettier from "eslint-plugin-prettier";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  js.configs.recommended,
  prettierConfig,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: ["node_modules"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser,
    },
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "jsx-a11y": pluginJsxA11y,
      import: pluginImport,
      prettier: pluginPrettier,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginJsxA11y.configs.recommended.rules,
      ...pluginImport.configs.recommended.rules,
      "prettier/prettier": "error",
    },
    settings: {
      react: { version: "detect" },
    },
  },
];
