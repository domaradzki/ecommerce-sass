/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './node_modules/flowbite/**/*.js',
    './src/**/*.{js,ts,jsx,tsx}',
    // './pages/**/*.{js,ts,jsx,tsx}',
    // './components/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      colors: {
        primary:
          'bg-primary-100 text-primary-800 dark:bg-primary-200 dark:text-primary-800 group-hover:bg-primary-200 dark:group-hover:bg-primary-300',
      },
      animation: {
        // Tooltip
        'slide-up-fade': 'slide-up-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down-fade': 'slide-down-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        // Tooltip
        'slide-up-fade': {
          '0%': { opacity: 0, transform: 'translateY(6px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'slide-down-fade': {
          '0%': { opacity: 0, transform: 'translateY(-6px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('flowbite/plugin'),
    plugin(({ addVariant }) => {
      addVariant('radix-side-top', '&[data-side="top"]');
      addVariant('radix-side-bottom', '&[data-side="bottom"]');
    }),
  ],
};
