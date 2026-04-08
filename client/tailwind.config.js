/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'ui-sans-serif', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        accent: {
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
      },
      boxShadow: {
        'soft': '0 18px 45px rgba(15, 23, 42, 0.18)',
        'glow': '0 0 20px rgba(249, 115, 22, 0.3)',
        'glow-lg': '0 0 30px rgba(249, 115, 22, 0.4)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeInUp: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeDown: {
          '0%': { transform: 'translateY(-40px)', opacity: '0' },
          '50%': { opacity: '0.7' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: 0, transform: 'translateX(-20px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: 0, transform: 'scale(0.9)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(249, 115, 22, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(249, 115, 22, 0.6)' },
        },
        float3d: {
          '0%, 100%': { transform: 'translateY(0) translateX(0) scale(1) rotateZ(0deg)' },
          '25%': { transform: 'translateY(-25px) translateX(10px) scale(1.15) rotateZ(5deg)' },
          '50%': { transform: 'translateY(-10px) translateX(-10px) scale(0.95) rotateZ(-5deg)' },
          '75%': { transform: 'translateY(15px) translateX(5px) scale(1.05) rotateZ(3deg)' },
        },
        floatSmooth: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-30px)' },
        },
        floatSmoothSlow: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '33%': { transform: 'translateY(-20px) translateX(5px)' },
          '66%': { transform: 'translateY(-10px) translateX(-5px)' },
        },
        slideLeftToRight: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        floatHorizontal: {
          '0%, 100%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(8px)' },
        },
        slideInFromLeft: {
          '0%': { transform: 'translateX(-50px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInFromRight: {
          '0%': { transform: 'translateX(50px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        roleFade: {
          '0%, 100%': { opacity: '0', transform: 'translateY(10px)' },
          '10%, 90%': { opacity: '1', transform: 'translateY(0)' },
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%, 50%': { borderColor: 'transparent' },
          '51%, 100%': { borderColor: 'currentColor' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'float-3d': 'float3d 6s ease-in-out infinite',
        'float-smooth': 'floatSmooth 3s ease-in-out infinite',
        'float-smooth-slow': 'floatSmoothSlow 5s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-down': 'fadeDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-left-right': 'slideLeftToRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'float-horizontal': 'floatHorizontal 3s ease-in-out infinite',
        'slide-in-left': 'slideInFromLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-in-right': 'slideInFromRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'role-fade': 'roleFade 3s ease-in-out',
        'typing': 'typing 2s steps(20)',
        'blink': 'blink 1s step-end infinite',
        'slide-in': 'slideIn 0.6s ease-out both',
        'scale-in': 'scaleIn 0.5s ease-out both',
        shimmer: 'shimmer 2s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

