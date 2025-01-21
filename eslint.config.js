import globals from "globals";
import pluginJs from "@eslint/js";
import pluginEditorConfig from "eslint-plugin-editorconfig";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    rules: {
      "linebreak-style": ["error", "unix"], // Проверка переносов строк
    },
  },
  {
    languageOptions: { globals: globals.browser }
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      editorconfig: pluginEditorConfig, // Подключаем плагин
    },
    settings: {
      editorconfig: true, // Активируем поддержку EditorConfig
    },
  },
];
