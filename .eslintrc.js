module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    env: {
        es2020: true,
        node: true
    },
    plugins: ["@typescript-eslint", "prettier"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "prettier/@typescript-eslint"
    ],
    rules: {
        "no-console": 1,
        "prettier/prettier": 1,
        eqeqeq: 2,
        "@typescript-eslint/explicit-module-boundary-types": 0
    }
};
