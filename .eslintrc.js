module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "es2017": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 2018
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "quotes": 1,
        "max-len": [1, 150],
        "max-params": [2, 3],
        "no-use-before-define": "off",
        "@typescript-eslint/no-unused-vars": "warn"
    }
}
