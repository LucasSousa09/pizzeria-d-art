import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '440px',
      },
      colors: {
        primary: '#F13A00',
        background: '#FFE3DA',
        'pag-active': '#FF8B02',
        overlay: 'rgba(0,0,0,0.4)',
      },
      maxWidth: {
        '1920': '1920px'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
export default config