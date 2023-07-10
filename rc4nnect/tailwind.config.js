/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite-react/**/*.js',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      colors: {
        'dark-purple': '#081A51',
        'light-white': 'rgba(255,255,255,0.17)',
      },

      gridTemplateColumns: {
        '40': 'repeat(40, minmax(0, 1fr))'
      }
    },
  },
  plugins: [
    require("flowbite/plugin"),
    require("@tailwindcss/forms"),
  ],
}
