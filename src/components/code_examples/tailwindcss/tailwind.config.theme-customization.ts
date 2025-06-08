// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    // デフォルトを上書きしたい場合はここに直接書く
    // screens: { // 例: デフォルトのブレークポイントを完全に置き換える
    //   'tablet': '640px',
    //   'laptop': '1024px',
    // },
    extend: { // デフォルトを拡張する場合
      colors: {
        'brand-primary': '#FF6B6B',
        'brand-secondary': '#4ECDC4',
        'custom-gray': {
          100: '#f7fafc',
          // ...
          900: '#1a202c',
        },
      },
      spacing: {
        '72': '18rem', // 72 * 0.25rem = 18rem
        '84': '21rem',
        '96': '24rem',
      },
      fontFamily: {
        // 基礎編で触れたカスタムフォント設定
        nicoMoji: ['var(--nicomoji)', 'sans-serif'],
        notojp: ['var(--font-noto-jp)', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'bounce-custom': 'bounce 1s infinite alternate',
      },
      keyframes: {
        bounce: { // bounceアニメーションをカスタマイズ (例)
          '0%, 100%': {
            transform: 'translateY(-15%)',
            animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
          },
          '50%': {
            transform: 'none',
            animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
          },
        },
      },
    },
  },
  plugins: [
    // require('@tailwindcss/typography'),
    // require('daisyui'),
  ],
  // daisyui: { themes: [...] }
};
export default config;
