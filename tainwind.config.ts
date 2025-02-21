import type { Config } from 'tailwindcss'
module.exports = {
    mode: 'jit',
    darkMode: 'class',
    content: ['./**/*.vue'],
    theme: {
        extend: {},
    },
    plugins: [require('@tailwindcss/typography')],
};
