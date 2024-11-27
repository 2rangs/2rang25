import type { Config } from 'tailwindcss'
module.exports = {
    darkMode: 'class',
    content: ['./**/*.vue'],
    theme: {
        extend: {},
    },
    plugins: [require('@tailwindcss/typography')],
};
