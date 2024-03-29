module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "es2017": true,
        "amd": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 2020
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "quotes": 0,
        "max-len": [1, 200],
        "max-params": [2, 3],
        "no-use-before-define": "off",
        "@typescript-eslint/no-unused-vars": "warn",
        '@typescript-eslint/no-var-requires': 0,
    }
}
