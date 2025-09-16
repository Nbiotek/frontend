import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/atoms/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      white: '#fff',
      black: '#1B1B1B',
      gray: '#848484',
      bgGray: '#F7F8FA',
      typeGray: '#747F86',
      borderLine: '#DEE2E9',
      blue: {
        '50': '#78B2FF',
        '100': '#78B2FF',
        '200': '#358BFF',
        '300': '#0067F0',
        '400': '#004AAD'
      },
      green: {
        '100': '#C3E5C4',
        '200': '#87CB89',
        '300': '#4CAF50',
        '400': '#3B883E',
        '500': '#2A602C'
      },
      red: {
        '100': '#ffb7b0',
        '200': '#ff6f61',
        '300': '#ff3320',
        '400': '#dd1400',
        '500': '#dd1400'
      },
      neutral: {
        '0': '#FFFFFF',
        '50': '#F6F6F6',
        '60': '#F7F8F9',
        '75': '#BDC5DB',
        '100': '#E7E7E7',
        '200': '#D1D1D1',
        '300': '#B0B0B0',
        '400': '#888888',
        '500': '#6D6D6D',
        '600': '#5D5D5D',
        '700': '#474747',
        '800': '#454545',
        '900': '#3D3D3D',
        '950': '#222222',
        '1000': '#171717'
      },
      error: {
        '100': '#fdb2bf',
        '200': '#fa657e',
        '300': '#f8183e',
        '400': '#cc0628',
        '500': '#90041c',
        '600': '#f8183e'
      },
      violet: {
        '50': '#f5f3ff',
        '100': '#ede9fe',
        '200': '#ddd6fe',
        '300': '#c4b5fd',
        '400': '#a78bfa',
        '500': '#8b5cf6',
        '600': '#7c3aed',
        '700': '#6d28d9',
        '800': '#5b21b6',
        '900': '#4c1d95'
      },
      yellow: {
        '50': '#FDFDEA',
        '100': '#FDF6B2',
        '200': '#FCE96A',
        '300': '#FACA15',
        '400': '#E3A008',
        '500': '#C27803',
        '600': '#9F580A',
        '700': '#8E4B10',
        '800': '#723B13',
        '900': '#633112'
      },
      darkRed: '#D32F2F',
      amber: '#FFA000',
      teal: '#00897B',
      input_bg: 'var(--input)',
      gray_light: 'var(--gray-light)',
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))'
      },
      popover: {
        DEFAULT: 'hsl(var(--popover))',
        foreground: 'hsl(var(--popover-foreground))'
      },
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))'
      },
      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))'
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))'
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))'
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))'
      },
      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      chart: {
        '1': 'hsl(var(--chart-1))',
        '2': 'hsl(var(--chart-2))',
        '3': 'hsl(var(--chart-3))',
        '4': 'hsl(var(--chart-4))',
        '5': 'hsl(var(--chart-5))'
      },
      sidebar: {
        DEFAULT: 'hsl(var(--sidebar-background))',
        foreground: 'hsl(var(--sidebar-foreground))',
        primary: 'hsl(var(--sidebar-primary))',
        'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
        accent: 'hsl(var(--sidebar-accent))',
        'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
        border: 'hsl(var(--sidebar-border))',
        ring: 'hsl(var(--sidebar-ring))'
      }
    },
    extend: {
      aspectRatio: {
        portrait: '4 / 5',
        landscape: '1.91 / 1',
        vertical: '9 / 16',
        cover: '108 / 17',
        hero: '1 / 1'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'caret-blink': {
          '0%,70%,100%': {
            opacity: '1'
          },
          '20%,50%': {
            opacity: '0'
          }
        },
        spin: {
          from: {
            transform: 'rotate(0deg)'
          },
          to: {
            transform: 'rotate(360deg)'
          }
        },
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
        spin: 'spin 1s linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      fontFamily: {
        roboto: ['var(--font-roboto)']
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.75rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3.4rem',
        '7xl': '4rem'
      },
      gridTemplateColumns: {
        response: 'repeat(auto-fit, minmax(220px, 1fr))',
        button: 'repeat(auto-fit, minmax(160px, 1fr))'
      }
    },
    screens: {
      sm: '390px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1536px'
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('tailwindcss-animate')]
} satisfies Config;
