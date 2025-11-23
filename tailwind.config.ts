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
        primary: {
          light: '#f3ebe6',
          lighter: '#f9f7f7',
          dark: '#764e45',
        },
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config

