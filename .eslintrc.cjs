module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
    "prettier"
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "tailwind.config.js", "supabase"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    ecmaFeatures: {
      jsx: true
    },
    sourceType: "module",
    project: ["./tsconfig.app.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname
  },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true }
    ],
    "@typescript-eslint/no-confusing-void-expression": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@tanstack/query/exhaustive-deps": "off",
    "no-inner-declarations": "off"
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
