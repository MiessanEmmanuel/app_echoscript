import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                /* 'blackblue': '#031e35', */
                'tertiaryblue': '#8791a5',
               /*  'white-blue': '#d6e0ea', */
                'bg-indigo': '#6c5ce7',
                'light-indigo' : '#C49FFF',

              },
        },
    },

    plugins: [forms],
};
