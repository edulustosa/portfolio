import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#30302E',
        'main-font-color': '#7E7F7D',
        'light-gray': '#454541',
        'secondary-font-color': '#E1E1DF',
        'main-orange': '#D86731',
      },
    },
  },
  plugins: [],
}

export default config
