/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-prettier/skip-formatting',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        env: {
            browser: true,
            amd: true,
            node: true,
        },
        extends: ['eslint:recommended', 'plugin:prettier/recommended'],
        plugins: ['prettier'],
        rules: {
            'prettier/prettier': [
                'error',
                {},
                {
                    usePrettierrc: true,
                },
            ],
            'no-console': 2,
        },
    },
}
