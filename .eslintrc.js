module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:prettier/recommended",
    "prettier/react",
  ],
  plugins: ["react-hooks"],
  parser: "babel-eslint",
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  rules: {
    /* TEMPORARILY DISABLED */
    "require-atomic-updates": "off",
    /* TEMPORARILY DISABLED */

    "no-use-before-define": ["error", { functions: false }],
    "no-unused-vars": ["error", { ignoreRestSiblings: true }],
    "import/prefer-default-export": "off",
    "no-console": ["error", { allow: ["warn", "error"] }],
    "no-param-reassign": "off",
    "no-underscore-dangle": "error",
    "valid-jsdoc": ["error", { requireReturn: false, requireParamType: true }],
    "prettier/prettier": "error",
    "react/prop-types": "off",
    "react/sort-comp": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
  settings: {
    react: {
      version: "detect", // React version. "detect" automatically picks the version you have installed.
    },
  },
};
