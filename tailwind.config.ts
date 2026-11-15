import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Meridian beige palette
        bg: '#f4eee4',
        bg2: '#ebe2d3',
        paper: '#fbf8f2',
        ink: '#2b2520',
        mut: '#6a5f52',
        line: 'rgba(43,37,32,.14)',
        sage: '#46594c',
        bronze: '#9a794c',
        sand: '#dfd2bd',
        stone: '#c6b69b',
        // Resilio taupe & rose palette (from resilio-site)
        taupe: '#CDBFB3',
        white: '#D9CEC5',
        espresso: '#2A211E',
        text: '#3A2E2A',
        muted: '#554640',
        rose: '#E8C3BE',
        'rose-dark': '#2A211E',
        'rose-light': '#E8C3BE',
        'on-btn': '#E8C3BE',
        chapter: '#6E5A52',
        'on-dark': '#F6E1DD',
        'on-dark-soft': '#D9C3BC',
        blush: '#E8C3BE',
        'i-blush': '#2A211E',
        'sage-resilio': '#D9CEC5',
        'i-sage': '#2A211E',
        sky: '#BFAEA1',
        'i-sky': '#2A211E',
        'sand-resilio': '#E3D8CF',
        'i-sand': '#2A211E',
      },
      fontFamily: {
        newsreader: ['Newsreader', 'Georgia', 'serif'],
        'hanken-grotesk': ['Hanken Grotesk', 'system-ui', 'sans-serif'],
        'nunito-sans': ['Nunito Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        't-h1': ['clamp(2.125rem, 1.5rem + 1.75vw, 3rem)', { lineHeight: '1.15' }],
        't-h2': ['clamp(1.75rem, 1.35rem + 1.1vw, 2.25rem)', { lineHeight: '1.22' }],
        't-h3': ['clamp(1.125rem, 1.05rem + .3vw, 1.3rem)', { lineHeight: '1.25' }],
        't-body': ['clamp(1rem, .96rem + .2vw, 1.125rem)', { lineHeight: '1.7' }],
        't-lead': ['clamp(1.0625rem, 1rem + .25vw, 1.125rem)', { lineHeight: '1.6' }],
        't-small': ['.875rem', { lineHeight: '1.55' }],
      },
      spacing: {
        wrap: '1200px',
        pad: 'clamp(20px, 4vw, 40px)',
        gap: 'clamp(80px, 10vw, 136px)',
      },
      borderRadius: {
        r: '6px',
        'r-sm': '4px',
      },
      transitionTimingFunction: {
        ease: 'cubic-bezier(.2,.8,.2,1)',
      },
      boxShadow: {
        card: '0 26px 50px -30px rgba(43,37,32,.4)',
        'card-hover': '0 18px 40px -24px rgba(42,33,30,.45)',
      },
    },
  },
  plugins: [],
};
export default config;